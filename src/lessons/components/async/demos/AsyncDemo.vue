<script setup lang="ts">
import { defineAsyncComponent, ref, shallowRef } from 'vue'

const latency = ref(1500)
const fail = ref(false)
const timeout = ref(3000)
const comp = shallowRef()
const loads = ref(0)

const Loading = { template: '<p class="animate-pulse text-sm">⏳ LoadingComponent (shown after `delay` ms)…</p>' }
const Failed = { props: ['error'], template: '<p class="text-sm text-red-500">💥 ErrorComponent: {{ error?.message }}</p>' }

function load() {
  loads.value++
  // a NEW async component each time so nothing is cached
  comp.value = defineAsyncComponent({
    loader: () =>
      new Promise((resolve, reject) =>
        setTimeout(() => (fail.value ? reject(new Error('network error')) : resolve(import('./HeavyChart.vue'))), latency.value),
      ),
    loadingComponent: Loading,
    delay: 200, // don't flash the spinner for fast loads
    errorComponent: Failed,
    timeout: timeout.value, // show ErrorComponent if it takes longer
    suspensible: false, // this demo runs inside a <Suspense>; opt out so our own states show
  })
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack text-sm">
      <label class="row">latency {{ latency }}ms <input v-model.number="latency" type="range" min="0" max="5000" step="100" /></label>
      <label class="row">timeout {{ timeout }}ms <input v-model.number="timeout" type="range" min="500" max="5000" step="100" /></label>
      <label class="row"><input v-model="fail" type="checkbox" /> make the loader reject</label>
      <button @click="load">load component (#{{ loads + 1 }})</button>
    </div>
    <div class="box min-h-28"><component :is="comp" v-if="comp" :key="loads" /></div>
  </div>
</template>
