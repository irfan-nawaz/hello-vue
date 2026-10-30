<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
import viteConfig from '/vite.config.ts?raw'
import registry from '@/lessons/registry.ts?raw'
</script>

<template>
  <p>
    <b>Dev</b>: Vite serves source files as native ES modules and transforms them on demand (instant start, fast HMR that
    preserves component state). <b>Build</b>: bundles with Rolldown into optimised, code-split chunks.
  </p>
  <Demo name="ViteFeatures" title="Vite features used by this lab" />
  <h2>This lab's config</h2>
  <CodeBlock :code="viteConfig" lang="ts" title="vite.config.ts" />
  <h2>How lessons are discovered</h2>
  <CodeBlock :code="registry" lang="ts" title="src/lessons/registry.ts" />
  <Callout type="tip">
    Add a folder <code>src/lessons/&lt;section&gt;/&lt;slug&gt;/</code> with <code>meta.ts</code> + <code>Page.vue</code> and it appears in the
    sidebar, search, routes and coverage map — no registration code.
  </Callout>
</template>
