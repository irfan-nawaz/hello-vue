<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <Demo name="CssDemo" title="Scoped, modules and v-bind()" :files="['demos/ScopedChild.vue']" />
  <h2>How scoped CSS works</h2>
  <CodeBlock lang="css" code="/* you write */                    /* Vue outputs */
.title { font-weight: 700 }        .title[data-v-7ba5bd90] { font-weight: 700 }
.box :deep(.card .title) {}        .box[data-v-7ba5bd90] .card .title {}
:slotted(em) {}                    em[data-v-xxxx-s] {}
:global(.dark) {}                  .dark {}" />
  <p>
    Every element rendered by the component gets a <code>data-v-hash</code> attribute. A child component's <b>root</b> element
    also gets the parent's hash, so parents can style a child's root for layout.
  </p>
  <Callout type="tip">
    This lab mostly uses Tailwind utility classes — scoped styles shine for component-specific CSS (animations, keyframes,
    complex selectors) where utilities get unwieldy.
  </Callout>
</template>
