<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
import typeTests from './demos/typeTests.ts?raw'
</script>

<template>
  <p>
    Vue is written in TypeScript and SFC templates are type-checked by <code>vue-tsc</code> / the Vue VS Code extension. In
    <code>&lt;script setup lang="ts"&gt;</code> most things are inferred; you annotate at the edges (props, emits, unions,
    DOM events).
  </p>
  <Demo name="TsDemo" title="A fully typed component" :files="['demos/TypedComponent.vue']" />
  <h2>Utility types, tested at compile time</h2>
  <CodeBlock :code="typeTests" lang="ts" title="demos/typeTests.ts" />
  <h2>Project setup</h2>
  <CodeBlock lang="json" code='// tsconfig.app.json (from create-vue)
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",   // "isolatedModules", "verbatimModuleSyntax", "jsx": "preserve" …
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "compilerOptions": { "paths": { "@/*": ["./src/*"] }, "noUncheckedIndexedAccess": true }
}' />
  <Callout type="tip">
    Global type augmentation (<code>ComponentCustomProperties</code>, <code>RouteMeta</code>, …) goes in a <code>.d.ts</code>
    with <code>export {}</code> so it's a module augmentation — see the Plugins lesson and <code>src/router/index.ts</code>.
  </Callout>
</template>
