<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <h2>ref()</h2>
  <p>
    <code>ref(x)</code> returns <code>{ value: x }</code> with a getter that <b>tracks</b> and a setter that
    <b>triggers</b>. Refs are auto-unwrapped at the top level of templates.
  </p>
  <Demo name="ReactivityFundamentals" title="Your first ref (from your learn/ folder)" />

  <h2>How Vue knows what to re-render</h2>
  <p>
    While a component renders, every reactive read is recorded as a dependency. Writing to one of those
    later schedules exactly that component to re-render. The panel below is fed by the
    <code>onRenderTracked</code> / <code>onRenderTriggered</code> debug hooks.
  </p>
  <Demo name="DependencyTracking" title="Live dependency tracking" />

  <h2>reactive()</h2>
  <p>
    <code>reactive(obj)</code> returns a <b>Proxy</b> of the object — no <code>.value</code>, deeply reactive. Limits:
    only objects/arrays/Map/Set, can't be replaced wholesale, and loses reactivity when destructured.
  </p>
  <Demo name="Pitfalls" title="Pitfalls: destructuring & proxy identity" />
  <Callout type="tip" title="Recommendation">
    Prefer <code>ref()</code> as the primary way to declare state. It works with any value type and survives
    being passed around or destructured from composables.
  </Callout>

  <h2>DOM update timing</h2>
  <Demo name="NextTick" title="Batching & nextTick()" />
  <CodeBlock lang="ts" code="import { nextTick } from 'vue'
count.value++
await nextTick() // DOM is now updated" />

  <h2>In &lt;script setup&gt;</h2>
  <p>
    Top-level bindings (variables, functions, imports) are directly usable in the template. State must be
    created with <code>ref</code>/<code>reactive</code> to be reactive — plain <code>let</code> variables are not.
  </p>
</template>
