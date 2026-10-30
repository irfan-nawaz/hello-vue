<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    Children talk to parents by <b>emitting events</b>. Unlike native DOM events, component events <b>don't bubble</b> —
    you can only listen on the direct child.
  </p>
  <Demo name="EventsDemo" title="Typed, validated component events" :files="['demos/SearchBox.vue', 'demos/ValidatedEmit.vue']" />
  <Callout type="tip">
    Declaring emits isn't just documentation: listeners for declared events are removed from
    <code>$attrs</code>, so they don't fall through to the root element as native listeners.
  </Callout>
</template>
