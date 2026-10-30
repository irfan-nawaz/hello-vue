<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    The special <code>ref</code> attribute gives you a direct reference to a DOM element or child component
    instance after it is mounted — for focus, measuring, third-party libraries, or calling child methods.
  </p>
  <Demo name="Refs" title="All the ways to grab a ref" :files="['demos/Stopwatch.vue']" />
  <Callout type="tip">
    Before 3.5 you'd write <code>const input = ref(null)</code> with a variable named like the ref attribute. That still
    works, but <code>useTemplateRef()</code> is clearer and supports dynamic keys.
  </Callout>
  <Callout type="warn">
    Reach for refs sparingly. Using a child ref to drive behaviour couples parent and child — props and events
    are usually better.
  </Callout>
</template>
