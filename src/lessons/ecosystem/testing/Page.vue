<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
import e2e from '/e2e/vue.spec.ts?raw'
import useCounter from './__tests__/useCounter.spec.ts?raw'
import cartStore from './__tests__/cartStore.spec.ts?raw'
import LikeButton from './__tests__/LikeButton.spec.ts?raw'

const specs = { useCounter, cartStore, LikeButton }
</script>

<template>
  <table>
    <thead><tr><th>Level</th><th>Tool (this project)</th><th>Tests</th></tr></thead>
    <tbody>
      <tr><td>Unit</td><td>Vitest</td><td>composables, stores, pure functions</td></tr>
      <tr><td>Component</td><td>Vitest + Vue Test Utils (jsdom)</td><td>props in → DOM/events out, as a user sees it</td></tr>
      <tr><td>End-to-end</td><td>Playwright</td><td>the real app in real browsers</td></tr>
    </tbody>
  </table>
  <Demo name="BrowserTests" title="Component tests, live in the browser" :files="['demos/LikeButton.vue']" />
  <h2>The real Vitest specs</h2>
  <p>Run them with <code>pnpm test:unit</code>:</p>
  <CodeBlock :code="specs['useCounter']" lang="ts" title="__tests__/useCounter.spec.ts" />
  <CodeBlock :code="specs['cartStore']" lang="ts" title="__tests__/cartStore.spec.ts" class="mt-3" />
  <CodeBlock :code="specs['LikeButton']" lang="ts" title="__tests__/LikeButton.spec.ts" class="mt-3" />
  <h2>End-to-end</h2>
  <p>This lab's Playwright test visits <b>every lesson</b> and fails on console errors (<code>pnpm test:e2e</code>):</p>
  <CodeBlock :code="e2e" lang="ts" title="e2e/vue.spec.ts" />
  <Callout type="tip">
    Test behaviour, not implementation: query by text/role/test-id, trigger events, assert on output. Composables that use
    lifecycle hooks or inject need a host component (<code>mount</code> a tiny wrapper) — or wrap in <code>effectScope</code>.
  </Callout>
</template>
