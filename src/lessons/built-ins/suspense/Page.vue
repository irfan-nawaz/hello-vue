<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>&lt;Suspense&gt;</code> (still marked experimental) waits for <b>async dependencies</b> anywhere in its default slot —
    components with an <code>async setup()</code> / top-level <code>await</code> in <code>&lt;script setup&gt;</code>, and
    async components — showing the <code>#fallback</code> until all resolve.
  </p>
  <Demo name="SuspenseDemo" title="Two async children, one loading state" :files="['demos/AsyncProfile.vue']" />
  <h2>Nesting with the router, transitions and KeepAlive</h2>
  <CodeBlock code='<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense suspensible>   <!-- nested Suspense: suspensible defers to the parent -->
          <component :is="Component" />
          <template #fallback>Loading…</template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>' />
  <Callout type="info">
    Every <code>&lt;Demo&gt;</code> in this lab wraps its preview in a Suspense, which is why demos with top-level await just work.
    Once resolved, Suspense only goes back to pending if its root node is replaced (use <code>timeout</code> to control when the
    fallback reappears).
  </Callout>
</template>
