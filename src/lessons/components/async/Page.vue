<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>defineAsyncComponent(loader)</code> returns a wrapper that only calls <code>loader()</code> when it's actually
    rendered. With a dynamic <code>import()</code>, Vite splits the component into its own chunk.
  </p>
  <CodeBlock lang="ts" code="const AdminPanel = defineAsyncComponent(() => import('./AdminPanel.vue'))" />
  <Demo name="AsyncDemo" title="Loading, delay, timeout and error states" :files="['demos/HeavyChart.vue']" />
  <h2>Lazy hydration (3.5+, SSR)</h2>
  <CodeBlock lang="ts" code="import { defineAsyncComponent, hydrateOnVisible, hydrateOnIdle, hydrateOnInteraction } from 'vue'
const Comments = defineAsyncComponent({
  loader: () => import('./Comments.vue'),
  hydrate: hydrateOnVisible(),   // only hydrate when scrolled into view
})" />
  <Callout type="info">
    Inside a <code>&lt;Suspense&gt;</code>, async components are <i>suspensible</i> by default: Suspense's fallback is used
    and their own loading/error options are ignored (opt out with <code>suspensible: false</code>). This lab's lesson routes
    are lazy too — every lesson page is its own chunk.
  </Callout>
</template>
