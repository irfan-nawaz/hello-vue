<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    Deep reactivity is convenient but has a cost: every nested object gets a Proxy and every access is tracked. For big
    immutable data, external class instances, or integrating other state systems, opt out.
  </p>
  <Demo name="ShallowDemo" title="Shallow variants" />
  <Demo name="RawPerf" title="toRaw / markRaw / shallowRef — measured" />
  <Callout type="warn" title="Identity hazard">
    <code>markRaw</code> and <code>toRaw</code> are escape hatches: mixing raw and proxied versions of the same object can
    lead to identity bugs (<code>includes</code>/<code>===</code> comparisons failing).
  </Callout>
  <h2>customRef</h2>
  <Demo name="DebouncedRef" title="A debounced ref built with customRef()" />
</template>
