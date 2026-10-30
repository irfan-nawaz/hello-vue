<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    SSR renders components to <b>HTML on the server</b>, so the first paint and crawlers see content immediately; the client
    then <b>hydrates</b> that HTML — reusing the DOM and attaching event listeners. Vue's server renderer is plain JS, so this
    demo runs it right in your browser.
  </p>
  <Demo name="SSRDemo" title="Render → hydrate → mismatch, plus streaming APIs" :files="['demos/Article.vue']">
    <p>Render, then hydrate with “client differs” ticked: you'll get a hydration mismatch warning for the first value
      but not for the one marked <code>data-allow-mismatch</code>.</p>
  </Demo>
  <h2>A minimal Node server</h2>
  <CodeBlock lang="ts" code="import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString, renderToNodeStream, pipeToNodeWritable } from 'vue/server-renderer'
import App from './App.vue'

express().get('*', async (req, res) => {
  const app = createSSRApp(App)                   // fresh app per request (no shared state!)
  const ctx = {}
  const html = await renderToString(app, ctx)     // or stream:
  // pipeToNodeWritable(app, ctx, res)            // Node Writable (ESM-friendly)
  // renderToNodeStream(app).pipe(res)            // CJS build only
  res.send(`<div id=&quot;app&quot;>${html}</div><script type=&quot;module&quot; src=&quot;/client.js&quot;></script>`)
}).listen(3000)" />
  <h2>Rules for universal code</h2>
  <ul>
    <li>Only <code>beforeCreate</code>/<code>created</code>/<code>setup</code> and <code>serverPrefetch</code> run on the server — no <code>onMounted</code>.</li>
    <li>No <code>window</code>/<code>document</code> at the top level; guard with <code>onMounted</code> or <code>import.meta.env.SSR</code>.</li>
    <li>Avoid module-level shared state — it would leak between requests. Pinia/Router create per-app instances.</li>
    <li>Server and client must render the same initial DOM, or hydration patches it (and warns). Use <code>data-allow-mismatch</code> for unavoidable cases (timestamps).</li>
  </ul>
  <Callout type="tip">
    In practice, use <b>Nuxt</b> (SSR, SSG, routing, data fetching) or VitePress (docs). Vue 3.5 adds lazy hydration
    strategies (<code>hydrateOnVisible</code> …) and <code>useId()</code> for SSR-stable ids.
  </Callout>
</template>
