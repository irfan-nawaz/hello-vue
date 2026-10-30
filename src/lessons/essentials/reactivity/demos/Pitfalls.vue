<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'

const raw = { count: 0 }
const state = reactive(raw)

// ❌ destructuring a reactive object copies the primitive: no longer connected
const { count: lostCount } = state
// ✅ toRefs keeps each property as a ref linked to the source
const { count: linkedCount } = toRefs(state)

const identity = {
  'reactive(raw) === raw': state === (raw as unknown),
  'reactive(raw) === reactive(raw)': reactive(raw) === state,
  'reactive(proxy) === proxy': reactive(state) === state,
}

// ref() can hold anything — and objects inside become deeply reactive
const list = ref([{ done: false }])
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <button @click="state.count++">state.count++</button>
      <p class="mono">state.count = {{ state.count }}</p>
      <p class="mono text-red-500">let { count } = state → {{ lostCount }} (stuck)</p>
      <p class="mono text-vue">toRefs(state).count → {{ linkedCount }}</p>
    </div>
    <div class="stack">
      <span class="label">Proxy identity</span>
      <p v-for="(v, k) in identity" :key="k" class="mono">{{ k }} → <b>{{ v }}</b></p>
      <span class="label">Deep ref</span>
      <label class="row text-sm"><input v-model="list[0]!.done" type="checkbox" /> list.value[0].done = {{ list[0]!.done }}</label>
    </div>
  </div>
</template>
