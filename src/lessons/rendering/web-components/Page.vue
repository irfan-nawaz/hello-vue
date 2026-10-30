<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>Two directions:</p>
  <ul>
    <li><b>Using</b> custom elements in Vue: tell the compiler which tags are native via <code>compilerOptions.isCustomElement</code>; Vue passes bindings as DOM properties when they exist.</li>
    <li><b>Building</b> custom elements with Vue: <code>defineCustomElement(component)</code> returns a class for <code>customElements.define</code>. Usable from plain HTML, React, Angular…</li>
  </ul>
  <Demo name="CustomElementDemo" title="Vue components as &lt;lab-*&gt; elements" :files="['demos/LabCounter.ce.vue', 'demos/register.ts']" />
  <CodeBlock lang="ts" code="// vite.config.ts
vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('lab-') } } })" />
  <Callout type="info">
    Events are dispatched as <code>CustomEvent</code>s with the payload in <code>detail</code> (an array). Slots are native
    <code>&lt;slot&gt;</code>s (no scoped slots). <code>provide/inject</code> works between Vue custom elements. Pass
    <code>{ shadowRoot: false }</code> (3.5) to render without shadow DOM.
  </Callout>
</template>
