<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    In the Options API, <code>this</code> is the component's <b>public instance</b> proxy. Besides your own data/props/methods
    it exposes <code>$</code>-prefixed properties and methods. They are also usable in templates.
  </p>
  <Demo name="InstanceExplorer" title="Instance explorer" />
  <Callout type="warn">
    <code>$parent</code>/<code>$root</code> create tight coupling — prefer props/emits or provide/inject.
    <code>$forceUpdate</code> is only for non-reactive state you can't fix otherwise.
  </Callout>
  <Callout type="info">
    In <code>&lt;script setup&gt;</code> the equivalents are: <code>useAttrs()</code>, <code>useSlots()</code>,
    <code>useTemplateRef()</code>, <code>defineEmits()</code>, <code>watch()</code>, <code>nextTick()</code>.
  </Callout>
</template>
