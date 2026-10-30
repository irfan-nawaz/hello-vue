<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>&lt;TransitionGroup&gt;</code> animates items of a <code>v-for</code> list. Besides enter/leave it adds a
    <code>-move</code> class: Vue measures positions before and after the update and animates the difference (the FLIP technique).
  </p>
  <Demo name="ShuffleList" title="Enter, leave and move" />
  <Demo name="Staggered" title="Staggered list with JS hooks" />
  <Callout type="info">
    Differences from Transition: no <code>mode</code>; optional <code>tag</code> to render a wrapper; every child must have a unique
    <code>key</code>; classes go on the items, not the container.
  </Callout>
</template>
