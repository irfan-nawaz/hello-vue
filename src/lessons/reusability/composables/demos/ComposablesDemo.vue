<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMouse as useVueUseMouse, useCounter } from '@vueuse/core'
import { useMouse } from './useMouse'
import { useFetch } from './useFetch'

const { x, y } = useMouse()
const vueUse = useVueUseMouse() // the library version: same idea, more options (touch, sourceType…)

// fetch a local file Vite serves (package.json) — url is a getter, so it refetches when id changes
const files = ['/package.json', '/components.json', '/does-not-exist.json']
const which = ref(0)
const { data, error, loading } = useFetch<Record<string, unknown>>(() => files[which.value]!)
const keys = computed(() => (data.value ? Object.keys(data.value).slice(0, 6).join(', ') : ''))

const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 5 })
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="box stack">
      <span class="label">useMouse() — ours vs VueUse</span>
      <p class="mono">ours: {{ x }}, {{ y }}</p>
      <p class="mono">vueuse: {{ vueUse.x }}, {{ vueUse.y }} ({{ vueUse.sourceType }})</p>
    </div>
    <div class="box stack">
      <span class="label">useFetch(getter)</span>
      <select v-model.number="which" aria-label="file">
        <option v-for="(f, i) in files" :key="f" :value="i">{{ f }}</option>
      </select>
      <p v-if="loading" class="animate-pulse text-sm">loading…</p>
      <p v-else-if="error" class="text-sm text-red-500">{{ error.message }}</p>
      <p v-else class="mono">keys: {{ keys }}</p>
    </div>
    <div class="box stack">
      <span class="label">VueUse useCounter (min 0, max 5)</span>
      <div class="row"><button @click="dec()">-</button><b class="text-lg">{{ count }}</b><button @click="inc()">+</button><button @click="reset()">reset</button></div>
    </div>
  </div>
</template>
