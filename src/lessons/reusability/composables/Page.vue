<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    A <b>composable</b> is a function that leverages the Composition API to encapsulate and reuse <b>stateful logic</b>.
    It's Vue's equivalent of React hooks — but called once in setup, not on every render.
  </p>
  <Demo name="ComposablesDemo" title="Writing and using composables" :files="['demos/useMouse.ts', 'demos/useFetch.ts']" />
  <h2>Conventions</h2>
  <ul>
    <li>Name them <code>useXxx</code>; return a plain object of refs so callers can destructure.</li>
    <li>Accept <code>MaybeRefOrGetter&lt;T&gt;</code> inputs and normalise with <code>toValue()</code> inside a watcher/computed so they're tracked.</li>
    <li>Clean up side effects in <code>onUnmounted</code> (or <code>onScopeDispose</code> to also work in effect scopes).</li>
    <li>Call them synchronously in <code>&lt;script setup&gt;</code>/<code>setup()</code> — that's where the active instance is set.</li>
  </ul>
  <CodeBlock lang="ts" code="type MaybeRef<T> = T | Ref<T> | ShallowRef<T> | WritableComputedRef<T>
type MaybeRefOrGetter<T> = MaybeRef<T> | ComputedRef<T> | (() => T)

toValue(1)            // 1
toValue(ref(1))       // 1
toValue(() => 1)      // 1 — calls getters (unref() does not)" />
  <Callout type="tip">
    Before writing one, check <RouterLink to="/ecosystem/vueuse">VueUse</RouterLink> — 200+ battle-tested composables.
  </Callout>
</template>
