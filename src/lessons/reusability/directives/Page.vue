<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    Directives are for reusing <b>low-level DOM access</b> on plain elements (focus, tooltips, intersection, drag).
    A directive is an object of lifecycle hooks, each receiving <code>(el, binding, vnode, prevVnode)</code>.
  </p>
  <Demo name="DirectivesDemo" title="Hooks, arguments, modifiers, render functions" />
  <CodeBlock lang="ts" code="binding = { value, oldValue, arg, modifiers, instance, dir }
// v-spy:demo.once.fast=&quot;color&quot; → arg 'demo', modifiers { once: true, fast: true }

app.directive('focus', vFocus)          // global
export default { directives: { focus } } // Options API local" />
  <Callout type="warn">
    Avoid directives on components: with multiple root nodes they're ignored (with a warning). Prefer
    built-ins (<code>v-bind</code>, <code>v-show</code>) or a component when you can.
  </Callout>
</template>
