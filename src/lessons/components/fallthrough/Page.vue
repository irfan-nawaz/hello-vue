<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    A “fallthrough attribute” is anything passed to a component that isn't a declared prop or emit — commonly
    <code>class</code>, <code>style</code>, <code>id</code> and <code>v-on</code> listeners. With a single root element they're
    added to it automatically; <code>class</code> and <code>style</code> are merged.
  </p>
  <Demo name="AttrsDemo" title="Where do attrs go?" :files="['demos/FancyButton.vue', 'demos/LabeledInput.vue', 'demos/MultiRoot.vue']" />
  <Callout type="info">
    <code>$attrs</code> / <code>useAttrs()</code> is <b>not reactive</b> (always up to date, but you can't watch it). Use a prop
    or <code>onUpdated</code> if you need to react to changes.
  </Callout>
</template>
