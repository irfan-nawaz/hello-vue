<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
import button from '@/components/ui/button/Button.vue?raw'
</script>

<template>
  <p>
    shadcn-vue isn't a dependency you import from <code>node_modules</code> — its CLI <b>copies component source</b> into
    <code>src/components/ui</code>. You own and edit the code. Behaviour and accessibility come from headless
    <b>Reka UI</b> primitives; styling is Tailwind with <code>cva</code> variants.
  </p>
  <CodeBlock lang="bash" code="pnpm dlx shadcn-vue@latest init                 # components.json, theme tokens in main.css, cn() util
pnpm dlx shadcn-vue@latest add button dialog select # copies the files into src/components/ui/" />
  <Demo name="ShadcnDemo" title="Components used by this lab" />
  <h2>Anatomy of a copied component</h2>
  <CodeBlock :code="button" title="src/components/ui/button/Button.vue" />
  <Callout type="tip">
    Theming is just CSS variables (<code>--primary</code>, <code>--radius</code>…) in <code>src/assets/main.css</code> with a
    <code>.dark</code> override — which <code>useDark()</code> toggles on <code>&lt;html&gt;</code>.
  </Callout>
</template>
