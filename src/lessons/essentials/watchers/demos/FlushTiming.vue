<script setup lang="ts">
import { ref, useTemplateRef, watch, watchPostEffect, watchSyncEffect } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const events = useEventLog()
const count = ref(0)
const el = useTemplateRef<HTMLElement>('el')
const dom = () => el.value?.textContent

// 'pre' (default): before the component updates → sees the OLD DOM
watch(count, (v) => events.log(`flush 'pre'   count=${v}, DOM="${dom()}"`, 'info'))
// 'post' / watchPostEffect: after the DOM update → sees the NEW DOM
watchPostEffect(() => events.log(`flush 'post'  count=${count.value}, DOM="${dom()}"`, 'success'))
// 'sync' / watchSyncEffect: immediately on every single write — no batching
watchSyncEffect(() => events.log(`flush 'sync'  count=${count.value}`, 'warn'))

function twice() {
  events.clear()
  count.value++
  count.value++
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <button @click="twice">count++ twice in one tick</button>
      <p>DOM: <span ref="el" class="mono text-lg">{{ count }}</span></p>
      <p class="text-sm text-muted-foreground">sync fires for each write; pre/post fire once (batched). Only post sees the new DOM.</p>
    </div>
    <EventLog :log="events" height="10rem" />
  </div>
</template>
