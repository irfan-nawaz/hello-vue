<script setup lang="ts">
import { Demo } from '@/kit'
</script>

<template>
  <p>Utilities for inspecting and converting between reactive values — essential when writing composables and libraries.</p>
  <Demo name="TruthTable" title="What is what? (truth table)" />
  <p>
    Note <code>reactive(markRaw(x))</code> is not a proxy, <code>readonly(reactive(x))</code> is both readonly and reactive
    (it still tracks the source), and nested objects in a <code>reactive()</code> are reactive themselves (deep), unlike
    <code>shallowReactive()</code>.
  </p>
  <Demo name="RefConversions" title="toRef, toRefs, toValue, unref, readonly" />
</template>
