<script setup lang="ts">
import { CodeBlock, Demo } from '@/kit'
</script>

<template>
  <h2>Create a project (what this lab was made with)</h2>
  <CodeBlock lang="bash" code="pnpm create vue@latest   # Vite + TS + Router + Pinia + Vitest + Playwright" />
  <p>
    <code>create-vue</code> scaffolds a Vite project. Vite compiles <code>.vue</code> files ahead of time, so the
    shipped bundle uses the small <b>runtime-only</b> build of Vue.
  </p>

  <h2>Without a build step</h2>
  <CodeBlock
    lang="html"
    code='<script type="module">
  import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
  createApp({ data: () => ({ count: 0 }), template: `<button @click="count++">{{ count }}</button>` })
    .mount("#app")
</script>'
  />
  <Demo name="NoBuildStep" title="Runtime template compilation (the CDN way)">
    <p>Edit the template string and mount it. It is compiled to a render function <i>in your browser</i>.</p>
  </Demo>

  <h2>Ways of using Vue</h2>
  <table>
    <thead><tr><th>Style</th><th>How</th><th>Good for</th></tr></thead>
    <tbody>
      <tr><td>Enhance static HTML</td><td>CDN + <code>createApp</code> / petite-vue</td><td>sprinkles of interactivity, no build</td></tr>
      <tr><td>Web Components</td><td><code>defineCustomElement</code></td><td>embedding in any page/framework</td></tr>
      <tr><td>SPA</td><td>Vite + SFC + Router (this lab)</td><td>app-like experiences</td></tr>
      <tr><td>Fullstack / SSR</td><td>Nuxt, <code>createSSRApp</code></td><td>SEO, fast first paint</td></tr>
      <tr><td>SSG / JAMStack</td><td>VitePress, Nuxt generate</td><td>docs, content sites</td></tr>
      <tr><td>Beyond the web</td><td><code>createRenderer</code>, Electron, Tauri, Capacitor</td><td>desktop, mobile, canvas, WebGL</td></tr>
    </tbody>
  </table>
</template>
