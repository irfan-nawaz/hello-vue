<script setup lang="ts">
import { markRaw, reactive, ref, shallowRef, toRaw } from 'vue'

const N = 200_000
const timings = ref<Record<string, string>>({})

function bench(label: string, make: () => { items: { v: number }[] }) {
  const t0 = performance.now()
  const s = make()
  let sum = 0
  for (const it of s.items) sum += it.v // each access through a proxy has a cost
  timings.value[label] = `${(performance.now() - t0).toFixed(1)}ms (sum ${sum})`
}

const data = () => ({ items: Array.from({ length: N }, (_, i) => ({ v: i })) })
const runAll = () => {
  bench('reactive() — deep proxies', () => reactive(data()))
  bench('shallowRef() — no deep proxies', () => shallowRef(data()).value)
  bench('reactive({ items: markRaw([...]) })', () => reactive({ items: markRaw(data().items) }))
  bench('toRaw(reactive()) — read the original', () => toRaw(reactive(data())))
}

// toRaw returns the original object behind a proxy
const state = reactive({ a: 1 })
const sameObject = toRaw(state) === toRaw(toRaw(state))
</script>

<template>
  <div class="stack">
    <button @click="runAll">create + iterate {{ N.toLocaleString() }} items four ways</button>
    <table class="text-sm">
      <tbody><tr v-for="(t, k) in timings" :key="k"><td class="mono">{{ k }}</td><td class="mono font-bold">{{ t }}</td></tr></tbody>
    </table>
    <p class="mono text-xs text-muted-foreground">toRaw(state) is stable: {{ sameObject }}</p>
  </div>
</template>
