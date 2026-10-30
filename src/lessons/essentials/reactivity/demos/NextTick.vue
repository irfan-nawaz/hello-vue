<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const count = ref(0)
const el = useTemplateRef<HTMLSpanElement>('el')
const events = useEventLog()

async function bump() {
  events.clear()
  count.value++
  count.value++
  count.value++
  events.log(`state is ${count.value}, DOM still shows "${el.value?.textContent}"`, 'warn')
  // DOM updates are batched and applied asynchronously in the next "tick"
  await nextTick()
  events.log(`after await nextTick(): DOM shows "${el.value?.textContent}" — 1 render for 3 writes`, 'success')
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <button @click="bump">count++ ×3 then read the DOM</button>
      <p>DOM: <span ref="el" class="mono text-lg">{{ count }}</span></p>
    </div>
    <EventLog :log="events" height="8rem" />
  </div>
</template>
