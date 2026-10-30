<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import { EventLog, useEventLog } from '@/kit'
import AsyncProfile from './AsyncProfile.vue'

const events = useEventLog()
const a = ref(800)
const b = ref(1600)
const fail = ref(false)
const run = ref(0)
const error = ref('')

// errors thrown by async setup are caught by normal error handling
onErrorCaptured((e) => {
  error.value = (e as Error).message
  events.log(`onErrorCaptured: ${error.value}`, 'error')
  return false
})
const restart = () => {
  error.value = ''
  run.value++
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack text-sm">
      <label class="row">profile A {{ a }}ms <input v-model.number="a" type="range" min="0" max="3000" step="100" /></label>
      <label class="row">profile B {{ b }}ms <input v-model.number="b" type="range" min="0" max="3000" step="100" /></label>
      <label class="row"><input v-model="fail" type="checkbox" /> make B fail</label>
      <button @click="restart">re-run</button>
      <p v-if="error" class="text-red-500">Error boundary: {{ error }}</p>
      <!-- one fallback waits for ALL async deps in the default slot -->
      <Suspense
        v-else
        :key="run"
        @pending="events.log('@pending', 'warn')"
        @fallback="events.log('@fallback shown', 'info')"
        @resolve="events.log('@resolve — all async deps done', 'success')"
      >
        <div class="stack">
          <AsyncProfile :ms="a" />
          <AsyncProfile :ms="b" :fail />
        </div>
        <template #fallback>
          <p class="box animate-pulse">⏳ Loading both profiles…</p>
        </template>
      </Suspense>
    </div>
    <EventLog :log="events" height="12rem" />
  </div>
</template>
