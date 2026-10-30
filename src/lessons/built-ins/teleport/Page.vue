<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>&lt;Teleport to="selector"&gt;</code> renders its content into another DOM node while keeping it a
    <b>logical child</b> of the component: props, events, provide/inject and devtools all still work.
  </p>
  <Demo name="TeleportDemo" title="Modal & toasts">
    <p>Open the modal normally, then with <code>:disabled</code> — it gets trapped by the box's <code>transform</code>.</p>
  </Demo>
  <Callout type="info">
    The target must exist when the Teleport mounts — or use <code>defer</code> (3.5+) to wait until the end of the current
    render. In SSR, teleports render into <code>ctx.teleports</code> and must be injected by you.
  </Callout>
</template>
