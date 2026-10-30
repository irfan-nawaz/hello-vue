<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    Every component setup runs inside an <b>effect scope</b> that's stopped on unmount — that's why watchers created in
    setup are cleaned up automatically. <code>effectScope()</code> gives you the same power outside components.
  </p>
  <Demo name="ScopeDemo" title="Start and stop a group of effects" />
  <CodeBlock lang="ts" code="const scope = effectScope(/* detached? */)
scope.run(() => { /* computed, watch, watchEffect, composables */ })
scope.stop()

// inside a composable: like onUnmounted, but also works in manual scopes
onScopeDispose(() => cleanup())
getCurrentScope() // the active scope or undefined" />
  <Callout type="info">
    Real-world uses: Pinia runs every store's setup in its own scope; VueUse's <code>createSharedComposable</code> shares one
    scope between consumers and stops it when the last one unmounts.
  </Callout>
</template>
