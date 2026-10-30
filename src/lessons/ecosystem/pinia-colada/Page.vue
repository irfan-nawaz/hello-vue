<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    Server data isn't app state: it's a <b>cache</b> of something remote. Pinia Colada (built on Pinia) handles caching by
    key, deduplication, stale-while-revalidate, retries, optimistic updates and invalidation — so components just declare
    what they need.
  </p>
  <CodeBlock lang="ts" title="main.ts" code="app.use(createPinia())
app.use(PiniaColada, { queryOptions: { staleTime: 5_000 } })" />
  <Demo name="ColadaDemo" title="Queries, mutations, optimistic updates & the cache" :files="['demos/fakeApi.ts', 'demos/TodoDetail.vue']" />
  <h2>Vocabulary</h2>
  <table>
    <tbody>
      <tr><td><code>status</code></td><td><code>pending</code> (no data yet) · <code>success</code> · <code>error</code> — about the data</td></tr>
      <tr><td><code>asyncStatus</code></td><td><code>idle</code> · <code>loading</code> — is a request in flight right now</td></tr>
      <tr><td><code>staleTime</code></td><td>how long data counts as fresh (no refetch on mount/focus)</td></tr>
      <tr><td><code>gcTime</code></td><td>how long an unused entry stays in cache</td></tr>
      <tr><td><code>refresh()</code> / <code>refetch()</code></td><td>fetch if stale / always fetch</td></tr>
    </tbody>
  </table>
  <Callout type="tip">
    Organise keys hierarchically (<code>['todos']</code>, <code>['todos', id]</code>) — invalidating <code>['todos']</code> invalidates
    everything below it. <code>defineQueryOptions</code> lets you share typed key+query pairs.
  </Callout>
</template>
