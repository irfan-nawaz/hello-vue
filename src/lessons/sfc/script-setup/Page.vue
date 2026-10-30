<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>&lt;script setup&gt;</code> is compile-time sugar for <code>setup()</code>: top-level bindings (variables, functions,
    imports) are usable in the template, there's less boilerplate, better TS inference and better runtime performance
    (the template compiles to an inline render function in the same scope).
  </p>
  <Demo name="ScriptSetupDemo" title="Generics, defineOptions, defineSlots, normal script" :files="['demos/GenericSelect.vue', 'demos/WithNormalScript.vue']" />
  <h2>Compiler macros (no import needed)</h2>
  <table>
    <tbody>
      <tr><td><code>defineProps / withDefaults</code></td><td>props (type-based or runtime)</td></tr>
      <tr><td><code>defineEmits</code></td><td>events</td></tr>
      <tr><td><code>defineModel</code></td><td>v-model prop + update event as a ref</td></tr>
      <tr><td><code>defineExpose</code></td><td>public API for parent template refs (closed by default)</td></tr>
      <tr><td><code>defineOptions</code></td><td><code>name</code>, <code>inheritAttrs</code>, custom options</td></tr>
      <tr><td><code>defineSlots</code></td><td>slot types (type-only)</td></tr>
    </tbody>
  </table>
  <h2>What it compiles to (simplified)</h2>
  <CodeBlock lang="ts" code="export default {
  __name: 'GenericSelect',
  props: { items: {}, modelValue: {} },
  emits: ['update:modelValue'],
  setup(__props, { expose: __expose }) {
    __expose()
    const model = useModel(__props, 'modelValue')
    return (_ctx, _cache) => /* inlined render function using `model` directly */
  },
}" />
  <Callout type="warn" title="Restrictions">
    Macros can't reference local variables (they're hoisted out of setup) — only imports and types. Don't use
    <code>src</code> on <code>&lt;script setup&gt;</code>. Imported types used by <code>defineProps&lt;T&gt;()</code> must be resolvable by
    the compiler (relative files or packages; not arbitrarily complex conditional types).
  </Callout>
</template>
