<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <Demo name="Registration" title="Local, Options-style and global" :files="['demos/LocalChild.vue']" />
  <CodeBlock lang="ts" code="// global — available everywhere, but not tree-shakeable and dependencies are implicit
app.component('MyButton', MyButton)

// local — <script setup>: just import it
import MyButton from './MyButton.vue'" />
  <Callout type="tip" title="Prefer local registration">
    It makes dependencies explicit, works with tree-shaking, and gives better IDE support. Use PascalCase in
    SFC templates; Vue also resolves the kebab-case form.
  </Callout>
  <h2>Automatic name inference</h2>
  <p>
    An SFC using <code>&lt;script setup&gt;</code> infers its name from its filename. It's used in devtools, warnings, recursive
    self-reference (a component can render itself by its filename) and <code>KeepAlive include</code>. Override it with
    <code>defineOptions({ name })</code>.
  </p>
</template>
