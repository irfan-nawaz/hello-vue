<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    Each component goes through <b>setup → mount → (update)* → unmount</b>. Hooks let you run code at each step.
    The order between parents and children is the key insight: <b>parents start first, children finish first</b>.
  </p>
  <Demo name="LifecycleTimeline" title="Lifecycle order, live" :files="['demos/LifecycleChild.vue', 'demos/Buggy.vue']">
    <p>Unmount and mount the tree. Notice: Parent beforeMount → children mount → Parent mounted.
      Updating only Child A's prop updates only Child A — reactivity is per component.</p>
  </Demo>
  <table>
    <tbody>
      <tr><td><code>onBeforeMount / onMounted</code></td><td>before/after the initial DOM is inserted. Use mounted for DOM access.</td></tr>
      <tr><td><code>onBeforeUpdate / onUpdated</code></td><td>around a re-render caused by reactive change. Don't mutate state in onUpdated (loops).</td></tr>
      <tr><td><code>onBeforeUnmount / onUnmounted</code></td><td>cleanup timers, listeners, subscriptions.</td></tr>
      <tr><td><code>onErrorCaptured</code></td><td>error boundary for descendants; return <code>false</code> to stop propagation.</td></tr>
      <tr><td><code>onRenderTracked / onRenderTriggered</code></td><td>dev-only debugging of reactive dependencies — see <RouterLink to="/essentials/reactivity">the DepTracker</RouterLink>.</td></tr>
      <tr><td><code>onActivated / onDeactivated</code></td><td>KeepAlive — see <RouterLink to="/built-ins/keep-alive">KeepAlive</RouterLink>.</td></tr>
      <tr><td><code>onServerPrefetch</code></td><td>SSR-only async data — see <RouterLink to="/ecosystem/ssr">SSR</RouterLink>.</td></tr>
    </tbody>
  </table>
  <CodeBlock lang="ts" code="onRenderTriggered((e) => {
  debugger // inspect e.target, e.key, e.type, e.oldValue, e.newValue
})" />
  <Callout type="warn">Hooks must be registered <b>synchronously</b> during setup — not inside <code>setTimeout</code> or after an <code>await</code>.</Callout>
</template>
