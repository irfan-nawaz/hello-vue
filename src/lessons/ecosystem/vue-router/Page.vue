<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
import routes from './routes.ts?raw'
</script>

<template>
  <p>
    Vue Router maps URLs to components. This whole lab is routed: every lesson is a lazy route generated from the
    registry, and this lesson has its own <b>nested child routes</b> rendered in the demo below. Watch the URL bar.
  </p>
  <Demo name="RouterDemo" title="A router inside a lesson" :files="['routes.ts', 'demos/UserView.vue', 'demos/LoginView.vue']" />
  <h2>Navigation resolution flow</h2>
  <ol>
    <li>Navigation triggered → <code>onBeforeRouteLeave</code> in deactivated components</li>
    <li>global <code>beforeEach</code> → <code>onBeforeRouteUpdate</code> in reused components</li>
    <li><code>beforeEnter</code> in route config → resolve async components</li>
    <li><code>beforeRouteEnter</code> (Options API) → global <code>beforeResolve</code></li>
    <li>navigation confirmed → global <code>afterEach</code> → DOM updates</li>
  </ol>
  <CodeBlock :code="routes" lang="ts" title="routes.ts" />
  <Callout type="info">
    Router 4.4+/5 also supports <b>typed routes</b> and <b>file-based routing</b> (formerly <code>unplugin-vue-router</code>): pages
    in <code>src/pages/</code> become routes with typed names and params. This lab uses its own glob-based registry instead.
  </Callout>
</template>
