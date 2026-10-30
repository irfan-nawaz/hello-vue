<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    Computed values derive state; <b>watchers perform side effects</b> in reaction to state changes — fetching,
    logging, touching the DOM, syncing to storage.
  </p>
  <Demo name="WatchSources" title="Sources, deep, immediate, once & watchEffect" />
  <table>
    <thead><tr><th></th><th>watch</th><th>watchEffect</th></tr></thead>
    <tbody>
      <tr><td>Dependencies</td><td>explicit source</td><td>whatever is read synchronously</td></tr>
      <tr><td>Runs initially</td><td>only with <code>immediate</code></td><td>yes</td></tr>
      <tr><td>Old value</td><td>yes</td><td>no</td></tr>
    </tbody>
  </table>
  <h2>Flush timing</h2>
  <Demo name="FlushTiming" title="pre vs post vs sync" />
  <h2>Side-effect cleanup & stopping</h2>
  <Demo name="CleanupRace" title="Race conditions & onWatcherCleanup()" />
  <Callout type="warn" title="Async gotcha">
    <code>watchEffect</code> only tracks reads before the first <code>await</code>. Watchers created synchronously in
    setup stop automatically with the component; ones created asynchronously must be stopped manually.
  </Callout>
</template>
