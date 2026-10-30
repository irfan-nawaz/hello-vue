<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    VueUse is a collection of 200+ composables. They all follow the same conventions you learned in
    <RouterLink to="/reusability/composables">Composables</RouterLink>: accept refs/getters, return refs, and clean up after
    themselves when the component (or effect scope) is disposed.
  </p>
  <Demo name="Gallery" title="12 composables, live" />
  <Callout type="info">
    This lab uses VueUse throughout: <code>useDark</code> (theme), <code>useLocalStorage</code> (progress store),
    <code>useMagicKeys</code> (⌘K search), <code>useClipboard</code> (copy code), <code>refDebounced</code> (compile explorer),
    <code>useIntervalFn</code> (Colada cache inspector), <code>useTransition</code> (animation lesson).
  </Callout>
</template>
