<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <Demo name="MixinsDemo" title="mixins, extends, provide/inject, name, inheritAttrs, components, directives" />
  <Callout type="warn" title="Why mixins are discouraged">
    <ul>
      <li><b>Unclear source</b> — where does <code>this.x</code> come from?</li>
      <li><b>Namespace collisions</b> — two mixins with <code>source</code>: one silently wins (see above).</li>
      <li><b>Implicit coupling</b> — mixins rely on each other's properties.</li>
    </ul>
    Composables fix all three: explicit imports, renamable destructuring, explicit arguments.
  </Callout>
  <p>
    Merge rules: <code>data</code> merges recursively (component wins), hooks are concatenated (mixin hooks run first),
    <code>methods/computed/components</code> objects are merged (component wins). Custom options use
    <code>app.config.optionMergeStrategies</code>.
  </p>
</template>
