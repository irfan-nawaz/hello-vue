<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    Components split the UI into independent, reusable pieces. A component is usually an SFC; it receives
    <b>props</b>, emits <b>events</b> and accepts <b>slots</b>.
  </p>
  <Demo name="Blog" title="Props down, events up, slots in" :files="['demos/BlogPost.vue']" />
  <h2>Dynamic components</h2>
  <Demo name="DynamicTabs" title="<component :is>">
    <p>Type in the Home input, switch tabs and come back. With KeepAlive the state survives.</p>
  </Demo>
  <Callout type="info" title="In-DOM template caveats">
    When writing templates directly in HTML (no build): use kebab-case (<code>&lt;blog-post&gt;</code>), explicit closing
    tags, and <code>is="vue:blog-post"</code> inside restricted elements like <code>&lt;table&gt;</code>.
  </Callout>
</template>
