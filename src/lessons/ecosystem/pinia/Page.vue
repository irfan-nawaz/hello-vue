<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
import plugin from '@/stores/plugins/undo.ts?raw'
</script>

<template>
  <p>
    When state is shared by many components, lift it into a <b>store</b>. Pinia is Vue's official store: type-safe, devtools
    integrated (open Vue DevTools → Pinia), SSR-ready, and modular — each store is defined and imported separately.
  </p>
  <Demo name="PiniaDemo" title="Stores in action" :files="['demos/cartStore.ts', 'demos/prefsStore.ts', 'demos/CartWidget.vue']" />
  <h2>Plugins</h2>
  <CodeBlock :code="plugin" lang="ts" title="src/stores/plugins/undo.ts" />
  <Callout type="tip" title="Do you even need a store?">
    For simple shared state, a module-level <code>reactive()</code> or a composable works. Pinia adds devtools, SSR safety
    (one state per request), plugins, HMR and conventions — worth it once state is app-wide.
  </Callout>
  <Callout type="info">This lab's own progress tracker is a Pinia setup store using VueUse's <code>useLocalStorage</code> — see <code>src/stores/progress.ts</code>.</Callout>
</template>
