<script setup lang="ts">
import { Callout, CompileExplorer, Demo } from '@/kit'
</script>

<template>
  <p>
    Vue templates are valid HTML extended with <b>mustaches</b> for text and <b>directives</b>
    (<code>v-*</code> attributes) for everything else. The compiler turns them into optimised render functions.
  </p>

  <h2>Text interpolation</h2>
  <Demo name="TextInterpolation" title="{{ mustache }} and v-text" />

  <h2>Raw HTML</h2>
  <Demo name="RawHTML" title="v-html vs mustache">
    <p>Try <code>&lt;img src=x onerror=alert(1)&gt;</code> — this is why <code>v-html</code> on user input is dangerous.</p>
  </Demo>

  <h2>Attribute bindings</h2>
  <Demo name="AttributeBindings" title="v-bind in all its forms" />

  <h2>Directive anatomy</h2>
  <p>
    <code>v-on:submit.prevent="onSubmit"</code> = name <code>v-on</code>, <b>argument</b> <code>submit</code>,
    <b>modifier</b> <code>.prevent</code>, <b>value</b> <code>onSubmit</code>. Arguments can be dynamic:
    <code>:[attr]</code>, <code>@[event]</code>. Shorthands: <code>:</code> = <code>v-bind:</code>,
    <code>@</code> = <code>v-on:</code>, <code>#</code> = <code>v-slot:</code>.
  </p>
  <Demo name="SpecialDirectives" title="v-once · v-pre · v-cloak" />

  <h2>What the compiler makes of it</h2>
  <p>Edit the template and watch the generated render function and patch flags update:</p>
  <CompileExplorer
    template='<div :id="dynamicId" class="static">
  <p>static text</p>
  <p>{{ message }}</p>
  <button @click="count++">{{ count }}</button>
</div>'
  />
  <Callout type="tip">
    Expressions run in a sandbox with a whitelist of globals (<code>Math</code>, <code>Date</code>…).
    Only <b>single expressions</b> are allowed — no statements like <code>if</code> or <code>let</code>.
  </Callout>
</template>
