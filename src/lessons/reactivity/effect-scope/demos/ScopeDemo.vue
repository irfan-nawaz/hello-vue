<script setup lang="ts">
import { computed, effectScope, getCurrentScope, onScopeDispose, ref, watch, watchEffect, type EffectScope } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const events = useEventLog()
const source = ref(0)

// a composable that cleans up via onScopeDispose — works in components AND manual scopes
function useTicker(label: string) {
  const ticks = ref(0)
  const id = setInterval(() => ticks.value++, 1000)
  onScopeDispose(() => {
    clearInterval(id)
    events.log(`${label}: onScopeDispose → interval cleared`, 'warn')
  })
  return ticks
}

let scope: EffectScope | undefined
const active = ref(false)
const ticks = ref<ReturnType<typeof useTicker>>()
const doubled = ref<number>()

function start() {
  scope = effectScope()
  // everything created inside run() is collected by the scope
  scope.run(() => {
    events.log(`inside scope.run: getCurrentScope() === scope → ${getCurrentScope() === scope}`, 'info')
    const d = computed(() => source.value * 2)
    watch(source, (v) => events.log(`scoped watch: source=${v}`, 'effect'))
    watchEffect(() => (doubled.value = d.value))
    ticks.value = useTicker('ticker')
  })
  active.value = true
  events.log('scope started: 1 computed, 2 watchers, 1 interval', 'success')
}

function stop() {
  scope?.stop() // disposes ALL effects created in the scope at once
  active.value = false
  events.log('scope.stop()', 'error')
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <div class="row">
        <button :disabled="active" @click="start">effectScope().run(…)</button>
        <button :disabled="!active" @click="stop">scope.stop()</button>
        <button @click="source++">source++ ({{ source }})</button>
      </div>
      <p class="mono">doubled (via scoped watchEffect): {{ doubled ?? '—' }} · ticks: {{ ticks ?? '—' }}</p>
      <p class="text-xs text-muted-foreground">After stop(), source++ no longer updates doubled or logs, and the ticker freezes.</p>
    </div>
    <EventLog :log="events" height="12rem" />
  </div>
</template>
