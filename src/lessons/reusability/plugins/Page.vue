<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
import augment from '../plugins/augment.d.ts?raw'
</script>

<template>
  <p>
    Plugins add <b>app-level</b> functionality: global components/directives, <code>app.provide</code>,
    <code>globalProperties</code>, or a library's setup (Router, Pinia, Colada are all plugins).
  </p>
  <Demo name="PluginDemo" title="A tiny i18n plugin" :files="['demos/i18nPlugin.ts', 'demos/Greeting.vue']" />
  <p>
    <code>v-t</code> also follows the locale — not because directives are reactive, but because the component re-renders
    (its template calls <code>$t()</code>, which reads <code>locale</code>) and a re-render re-runs directive hooks.
  </p>
  <h2>Typing what plugins add</h2>
  <CodeBlock :code="augment" lang="ts" title="src/lessons/reusability/plugins/augment.d.ts" />
  <Callout type="tip">Prefer <code>provide/inject</code> + a composable over <code>globalProperties</code>: explicit, typed, and works in setup.</Callout>
</template>
