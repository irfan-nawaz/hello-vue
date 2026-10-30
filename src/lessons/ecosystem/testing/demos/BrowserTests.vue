<script setup lang="ts">
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import LikeButton from './LikeButton.vue'

// The SAME Vue Test Utils used by Vitest, running in your browser with a tiny expect()
type Result = { name: string; ok: boolean; error?: string }
const results = ref<Result[]>([])
const buggy = ref(false)

function expect(actual: unknown) {
  return {
    toBe: (exp: unknown) => {
      if (actual !== exp) throw new Error(`expected ${JSON.stringify(exp)}, got ${JSON.stringify(actual)}`)
    },
    toEqual: (exp: unknown) => {
      if (JSON.stringify(actual) !== JSON.stringify(exp)) throw new Error(`expected ${JSON.stringify(exp)}, got ${JSON.stringify(actual)}`)
    },
  }
}

const tests: [string, () => Promise<void> | void][] = [
  ['renders the count', () => {
    const w = mount(LikeButton, { props: { modelValue: 3, buggy: buggy.value } })
    expect(w.text()).toBe('♥ 3')
  }],
  // (Vitest specs use wrapper.emitted(); in a browser with Vue DevTools attached that helper
  //  double-records, so here we listen with an onUpdate:modelValue prop instead)
  ['emits update:modelValue with +1', async () => {
    const calls: number[] = []
    const w = mount(LikeButton, { props: { modelValue: 0, buggy: buggy.value, 'onUpdate:modelValue': (v: number) => calls.push(v) } })
    await w.get('[data-testid="like"]').trigger('click')
    expect(calls).toEqual([1])
  }],
  ['does not exceed max', async () => {
    const calls: number[] = []
    const w = mount(LikeButton, { props: { modelValue: 5, max: 5, buggy: buggy.value, 'onUpdate:modelValue': (v: number) => calls.push(v) } })
    await w.get('button').trigger('click')
    expect(calls).toEqual([])
  }],
]

async function run() {
  results.value = []
  for (const [name, fn] of tests) {
    try {
      await fn()
      results.value.push({ name, ok: true })
    } catch (e) {
      results.value.push({ name, ok: false, error: (e as Error).message })
    }
  }
}
run()
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <label class="row text-sm"><input v-model="buggy" type="checkbox" @change="run" /> introduce a bug in LikeButton</label>
      <button @click="run">run tests</button>
      <p class="text-xs text-muted-foreground">Try the component: <LikeButton :max="3" :buggy /></p>
    </div>
    <ul class="box stack mono">
      <li v-for="r in results" :key="r.name" :class="r.ok ? 'text-vue' : 'text-red-500'">
        {{ r.ok ? '✓' : '✗' }} {{ r.name }}<div v-if="r.error" class="pl-4 opacity-80">{{ r.error }}</div>
      </li>
      <li class="text-muted-foreground">{{ results.filter((r) => r.ok).length }}/{{ results.length }} passed</li>
    </ul>
  </div>
</template>
