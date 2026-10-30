<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
import notes from '/docs/intro.md?raw'
</script>

<template>
  <p>
    Vue is a <b>progressive</b> framework for building UIs. Its two core features are
    <b>declarative rendering</b> (a template describes HTML output as a function of state) and
    <b>reactivity</b> (Vue tracks the state you read while rendering and re-renders exactly the
    components that depend on what changed).
  </p>

  <Demo name="DeclarativeRendering" title="Declarative rendering + reactivity">
    <p>Type in the input or click — you never touch the DOM, you only change state.</p>
  </Demo>

  <h2>Single-File Components</h2>
  <p>
    A <code>.vue</code> file holds a component's logic (<code>&lt;script&gt;</code>), template
    (<code>&lt;template&gt;</code>) and styles (<code>&lt;style&gt;</code>). Every demo in this lab is an SFC —
    the Code tab shows the exact file running in Preview.
  </p>

  <h2>Options API vs Composition API</h2>
  <Demo name="ApiStyles" title="Two API styles" :files="['demos/OptionsCounter.vue', 'demos/CompositionCounter.vue']" />
  <ul>
    <li><b>Options API</b> — an object of options; <code>this</code> points at the instance. Built on top of the Composition API.</li>
    <li><b>Composition API</b> — imported functions inside <code>&lt;script setup&gt;</code>; logic grouped by feature and extractable into composables.</li>
  </ul>
  <Callout type="tip" title="Which one?">
    Both are first-class. This lab uses Composition API + <code>&lt;script setup&gt;</code> by default and has a
    dedicated <RouterLink to="/options-api/options-state">Options API section</RouterLink>.
  </Callout>

  <h2>Under the hood: compiler-informed virtual DOM</h2>
  <p>
    Vue's compiler analyses templates and marks dynamic parts with <i>patch flags</i>; static parts are cached.
    At runtime Vue only diffs what can change. See it live in
    <RouterLink to="/rendering/rendering-mechanism">Rendering Mechanism</RouterLink>.
  </p>

  <h2>Your notes</h2>
  <p>Your own notes from <code>docs/intro.md</code>, bundled with Vite's <code>?raw</code> import:</p>
  <CodeBlock :code="notes" lang="md" title="docs/intro.md" />
</template>
