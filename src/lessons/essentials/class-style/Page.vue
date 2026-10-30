<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>:class</code> and <code>:style</code> are enhanced <code>v-bind</code>s: besides strings they accept
    <b>objects</b> (<code>{ active: isActive }</code>) and <b>arrays</b> (<code>[a, b, { c: cond }]</code>), and they
    merge with a static <code>class</code>/<code>style</code> on the same element.
  </p>
  <Demo name="ClassStyle" title="Class & style playground" />
  <h2>On components</h2>
  <CodeBlock code='<!-- child root: <p class="foo bar">Hi</p> -->
<MyComponent class="baz" />   <!-- renders <p class="foo bar baz"> -->
<!-- multi-root components: choose where with $attrs.class / v-bind="$attrs" -->' />
  <Callout type="info">
    Vue auto-prefixes CSS properties that need it, and an array value (<code>display: ['-webkit-box', 'flex']</code>)
    renders the last one the browser supports. Type style objects with <code>CSSProperties</code>.
  </Callout>
</template>
