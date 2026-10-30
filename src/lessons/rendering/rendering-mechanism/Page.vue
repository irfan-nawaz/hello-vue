<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    <b>Compile</b>: templates become render functions (at build time with Vite). <b>Mount</b>: the render function runs inside a
    reactive effect, returns a VNode tree, and the renderer creates DOM. <b>Patch</b>: when dependencies change, the effect
    re-runs, producing a new tree that is diffed against the old one.
  </p>
  <h2>Compiler-informed virtual DOM</h2>
  <p>
    Pure virtual-DOM diffing has to compare everything. Vue's compiler knows which parts can change and leaves hints:
  </p>
  <ul>
    <li><b>Static caching</b> — static nodes are created once and reused (<code>_cache[n]</code>, flag <code>CACHED</code>).</li>
    <li><b>Patch flags</b> — a bitmask on each dynamic node saying exactly what to check (text? class? which props?).</li>
    <li><b>Tree flattening</b> — a <i>block</i> collects all dynamic descendants into a flat <code>dynamicChildren</code> array; updates walk that array instead of the tree. Structural directives (<code>v-if</code>, <code>v-for</code>) open new blocks.</li>
  </ul>
  <Demo name="Presets" title="Compiler explorer with presets" />
  <h2>The real vnode tree</h2>
  <Demo name="VNodeInspector" title="Live subTree of a component" :files="['demos/LiveTarget.vue']">
    <p>Notice the root <code>dynamicChildren</code> count: the static <code>&lt;h4&gt;</code> is not in it.</p>
  </Demo>
  <h2>Compiler options at runtime</h2>
  <Demo name="RuntimeTemplate" title="template option + compilerOptions" />
  <Callout type="info">
    <code>app.config.compilerOptions</code> and the component <code>compilerOptions</code> option only apply when templates are
    compiled in the browser (full build). This lab registers a runtime compiler in <code>src/kit/runtimeCompiler.ts</code>.
  </Callout>
</template>
