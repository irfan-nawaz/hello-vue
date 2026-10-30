<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const events = useEventLog()
const x = ref(0)
const y = ref(0)
const obj = reactive({ nested: { count: 0 } })

// 1. a single ref
watch(x, (now, before) => events.log(`watch(x): ${before} → ${now}`, 'effect'))
// 2. a getter
watch(() => x.value + y.value, (sum) => events.log(`watch(() => x + y): sum = ${sum}`, 'effect'))
// 3. an array of sources
watch([x, () => obj.nested.count], ([nx, nc]) => events.log(`watch([x, getter]): [${nx}, ${nc}]`, 'effect'))
// 4. a reactive object is implicitly deep
watch(obj, () => events.log('watch(obj): deep by default', 'effect'))
// 5. getter returning an object is shallow unless { deep: true } (or a depth number)
watch(() => obj.nested, () => events.log('watch(() => obj.nested, { deep: true })', 'effect'), { deep: true })
// 6. immediate + once
watch(y, (v) => events.log(`watch(y, { immediate, once }) ran with ${v} — never again`, 'warn'), { immediate: true, once: true })
// watchEffect: no explicit source — tracks whatever it reads, runs immediately
watchEffect(() => events.log(`watchEffect: reads x=${x.value}, count=${obj.nested.count}`, 'hook'))
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <div class="row">
        <button @click="x++">x++ ({{ x }})</button>
        <button @click="y++">y++ ({{ y }})</button>
        <button @click="obj.nested.count++">obj.nested.count++ ({{ obj.nested.count }})</button>
      </div>
      <p class="text-sm text-muted-foreground">Each button fires a different subset of watchers. Predict, then click.</p>
    </div>
    <EventLog :log="events" height="18rem" />
  </div>
</template>
