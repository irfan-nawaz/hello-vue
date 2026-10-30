<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    A <code>.vue</code> file is HTML-like syntax with top-level <b>language blocks</b>. <code>@vue/compiler-sfc</code> (via
    <code>@vitejs/plugin-vue</code>) splits it: the template becomes a render function, scripts become a JS module, styles
    become CSS (scoped/module transformed). The lab's Code tabs show the raw SFC; the runtime runs the compiled module.
  </p>
  <Demo name="SrcImport" title="Blocks, comments and src imports" :files="['demos/SrcImport.css']" />
  <h2>Pre-processors</h2>
  <CodeBlock code='<script setup lang="ts">          <!-- built into Vite -->
<template lang="pug">                  <!-- pnpm add -D pug -->
<style lang="scss" scoped>             <!-- pnpm add -D sass -->
<style lang="postcss">                 <!-- postcss.config.* / Tailwind -->' />
  <h2>Custom blocks</h2>
  <CodeBlock code='<i18n lang="json">{ "en": { "hello": "Hello" } }</i18n>
<docs># Usage notes in markdown</docs>
<!-- need a Vite plugin to give them meaning, e.g. @intlify/unplugin-vue-i18n -->' />
  <h2>Tooling in this project</h2>
  <table>
    <tbody>
      <tr><td>Vite + <code>@vitejs/plugin-vue</code></td><td>dev server with HMR, SFC compilation, production bundling</td></tr>
      <tr><td>Vue - Official (VS Code) / Volar</td><td>template type-checking & IntelliSense</td></tr>
      <tr><td><code>vue-tsc</code></td><td><code>pnpm type-check</code> — tsc that understands .vue files</td></tr>
      <tr><td>Vue DevTools (<code>vite-plugin-vue-devtools</code>)</td><td>component tree, Pinia, router, timeline — press ⌥⇧D in dev</td></tr>
      <tr><td>ESLint (<code>eslint-plugin-vue</code>) + oxlint + Prettier</td><td><code>pnpm lint</code>, <code>pnpm format</code></td></tr>
      <tr><td>Vitest + Vue Test Utils, Playwright</td><td>unit/component tests, end-to-end tests</td></tr>
    </tbody>
  </table>
  <Callout type="info">Browser devtools can't map compiled render functions back to templates perfectly — use Vue DevTools for component state.</Callout>
</template>
