<script setup lang="ts">
import { onWatcherCleanup, ref, watch } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const events = useEventLog()
const id = ref(1)
const data = ref('')
const useCleanup = ref(true)

// fake API whose latency is random: later requests can finish first!
const fakeFetch = (n: number, signal: AbortSignal) =>
  new Promise<string>((resolve, reject) => {
    const ms = 300 + Math.random() * 1200
    const t = setTimeout(() => resolve(`user #${n} (${Math.round(ms)}ms)`), ms)
    signal.addEventListener('abort', () => (clearTimeout(t), reject(new Error('aborted'))))
  })

const stop = watch(id, async (n) => {
  const controller = new AbortController()
  // 3.5+: register cleanup — runs before the next run of this watcher (or on stop)
  if (useCleanup.value) onWatcherCleanup(() => {
    controller.abort()
    events.log(`cleanup: aborted request #${n}`, 'warn')
  })
  events.log(`request #${n} started`, 'info')
  try {
    data.value = await fakeFetch(n, controller.signal)
    events.log(`response: ${data.value}`, 'success')
  } catch {
    /* aborted */
  }
}, { immediate: true })

const stopped = ref(false)
function stopWatcher() {
  stop() // watch() returns a handle; also has .pause() / .resume() in 3.5
  stopped.value = true
  events.log('watcher stopped', 'error')
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <label class="row text-sm"><input v-model="useCleanup" type="checkbox" /> use onWatcherCleanup()</label>
      <div class="row">
        <button :disabled="stopped" @click="id++">next user (click fast!)</button>
        <button :disabled="stopped" @click="stopWatcher">stop()</button>
      </div>
      <p>id = {{ id }} · shown: <b :class="data.startsWith(`user #${id} `) ? 'text-vue' : 'text-red-500'">{{ data }}</b></p>
      <p class="text-xs text-muted-foreground">Without cleanup, a slow old response can overwrite a newer one (red = stale).</p>
    </div>
    <EventLog :log="events" height="12rem" />
  </div>
</template>
