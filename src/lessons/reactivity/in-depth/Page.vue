<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    Vue's reactivity is <b>runtime dependency tracking</b>: while an effect runs, every property read is recorded
    (<i>track</i>); writing a property re-runs every effect that read it (<i>trigger</i>). Components' render functions,
    <code>computed</code> and watchers are all effects.
  </p>
  <Demo name="MiniReactivity" title="A reactivity system from scratch" :files="['demos/miniReactivity.ts']">
    <p>Rename the user: only greetingEffect re-runs. Change the price: only totalEffect.</p>
  </Demo>
  <h2>What the real thing adds</h2>
  <ul>
    <li><b>Refs</b> for primitives (getter/setter on <code>.value</code>, since Proxies need objects).</li>
    <li><b>Deep</b> proxies created lazily on access, cached per target (so <code>reactive(x) === reactive(x)</code>).</li>
    <li><b>Version counting</b> & doubly-linked dep lists (3.5) — cheap re-tracking and no memory leaks.</li>
    <li><b>Scheduling</b>: component effects are batched into a queue flushed in a microtask (that's <code>nextTick</code>).</li>
    <li>Collections (Map/Set) and array methods instrumented; computed is lazy and cached.</li>
  </ul>
  <h2>Debugging</h2>
  <CodeBlock lang="ts" code="// components
onRenderTracked((e) => console.log(e))
onRenderTriggered((e) => { debugger })
// computed & watchers
computed(getter, { onTrack(e) {}, onTrigger(e) {} })
watch(source, cb, { onTrack(e) {}, onTrigger(e) {} })" />
  <Callout type="info">
    Integrate external state (Immer, XState, RxJS) by storing snapshots in a <code>shallowRef</code> and replacing
    <code>.value</code> when the external system changes.
  </Callout>
</template>
