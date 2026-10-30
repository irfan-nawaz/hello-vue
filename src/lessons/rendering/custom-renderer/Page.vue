<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    Vue's core (<code>@vue/runtime-core</code>) is platform-agnostic: components, reactivity, scheduling and the vnode diff
    don't know about the DOM. <code>createRenderer(nodeOps)</code> plugs in a target. <code>@vue/runtime-dom</code> is just
    one such renderer.
  </p>
  <Demo name="CanvasDemo" title="Vue rendering to a canvas" :files="['demos/canvasRenderer.ts']">
    <p>Move a slider: only <code>patchProp</code> runs. Add balls: <code>createElement</code> + <code>insert</code> — the same diff as the DOM.</p>
  </Demo>
  <Callout type="info">
    Real-world custom renderers: TresJS (Three.js), Vue Native/NativeScript, terminal UIs, PDF generators, and Vue's own
    SSR and test renderers.
  </Callout>
</template>
