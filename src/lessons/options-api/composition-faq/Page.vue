<script setup lang="ts">
import { Demo } from '@/kit'
</script>

<template>
  <Demo name="SideBySide" title="Search + pagination, both ways" :files="['demos/SearchOptions.vue', 'demos/SearchComposition.vue']">
    <p>Same behaviour. Compare the code: Options groups by <i>option type</i>, Composition by <i>logical concern</i>.</p>
  </Demo>
  <h2>Key points</h2>
  <ul>
    <li><b>Logic reuse</b> via composables — no mixin drawbacks.</li>
    <li><b>Flexible organisation</b> — related code stays together as components grow.</li>
    <li><b>Type inference</b> — plain variables and functions, no <code>this</code> gymnastics.</li>
    <li><b>Smaller bundles</b> — <code>&lt;script setup&gt;</code> compiles to a function; variables are minifiable (no <code>this.</code>).</li>
    <li><b>vs React Hooks</b> — setup runs once; no stale closures, no dependency arrays, no <code>useMemo</code>/<code>useCallback</code>.</li>
  </ul>
  <p>The Options API is still fully supported. You can even drop it from the bundle with <code>__VUE_OPTIONS_API__: false</code> if you never use it.</p>
</template>
