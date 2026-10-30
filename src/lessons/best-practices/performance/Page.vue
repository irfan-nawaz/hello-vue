<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    Two dimensions: <b>page load</b> (bundle size, code splitting, SSR/SSG) and <b>update</b> performance (how much work each
    change causes). Vue is fast by default; these are the tools when profiling shows a problem.
  </p>
  <h2>Props stability</h2>
  <Demo name="PropsStability" title="Re-render counters" :files="['demos/Row.vue']" />
  <h2>v-memo, v-once, shallowRef</h2>
  <Demo name="MemoDemo" title="2,000 rows" />
  <h2>Virtualise big lists</h2>
  <Demo name="Virtualized" title="100,000 rows" />
  <Callout type="tip" title="Checklist">
    Lazy-load routes and heavy components · keep props stable · <code>computed</code> returning new objects re-triggers — return
    primitives or compare with the previous value · <code>shallowRef</code>/<code>markRaw</code> for big immutable data ·
    avoid unnecessary component abstractions in huge lists · measure with Vue DevTools' performance timeline
    (<code>app.config.performance = true</code>) and the browser profiler.
  </Callout>
</template>
