<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>&lt;Transition&gt;</code> handles entering/leaving. For elements that stay on the page, animate with plain
    reactivity: toggle classes, bind styles, or interpolate numbers over time.
  </p>
  <Demo name="AnimationDemo" title="Three techniques" />
  <Callout type="tip">
    For complex timelines reach for GSAP / Motion (<code>motion-v</code>) — they play nicely with refs and watchers. Respect
    <code>prefers-reduced-motion</code> (VueUse: <code>usePreferredReducedMotion</code>).
  </Callout>
</template>
