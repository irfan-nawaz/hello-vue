<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>computed(getter)</code> returns a read-only ref whose value is <b>cached</b> and only recalculated when one
    of the reactive values it read last time changes. It is lazy: if nothing reads it, it never runs.
  </p>
  <Demo name="CachingVsMethod" title="Computed caching vs a method call">
    <p>Click “unrelated++”: the component re-renders, the method runs 3 more times, the computed doesn't run at all.</p>
  </Demo>
  <h2>Writable computed & previous value</h2>
  <Demo name="WritableComputed" title="get/set and previous value" />
  <Callout type="warn" title="Best practices">
    Getters should be <b>side-effect free</b> (no async, no DOM, no mutating other state — the counters above are a
    teaching exception). Treat the computed result as read-only: derive new state rather than mutating it.
  </Callout>
</template>
