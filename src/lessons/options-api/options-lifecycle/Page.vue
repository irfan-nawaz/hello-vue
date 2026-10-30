<script setup lang="ts">
import { Demo } from '@/kit'
</script>

<template>
  <Demo name="OptionsLifecycle" title="Every lifecycle option, logged" />
  <table>
    <thead><tr><th>Options API</th><th>Composition API</th></tr></thead>
    <tbody>
      <tr><td><code>beforeCreate / created</code></td><td><code>setup()</code> itself</td></tr>
      <tr><td><code>beforeMount / mounted</code></td><td><code>onBeforeMount / onMounted</code></td></tr>
      <tr><td><code>beforeUpdate / updated</code></td><td><code>onBeforeUpdate / onUpdated</code></td></tr>
      <tr><td><code>beforeUnmount / unmounted</code></td><td><code>onBeforeUnmount / onUnmounted</code></td></tr>
      <tr><td><code>errorCaptured</code></td><td><code>onErrorCaptured</code></td></tr>
      <tr><td><code>renderTracked / renderTriggered</code></td><td><code>onRenderTracked / onRenderTriggered</code></td></tr>
      <tr><td><code>activated / deactivated</code></td><td><code>onActivated / onDeactivated</code></td></tr>
      <tr><td><code>serverPrefetch</code></td><td><code>onServerPrefetch</code></td></tr>
    </tbody>
  </table>
</template>
