<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>&lt;Transition&gt;</code> animates a <b>single</b> element or component entering/leaving — triggered by
    <code>v-if</code>, <code>v-show</code>, <code>&lt;component :is&gt;</code> or a changing <code>key</code>.
  </p>
  <Demo name="ClassTimeline" title="The 6 transition classes, slowed down" />
  <h2>Modes and JavaScript hooks</h2>
  <Demo name="ModesAndHooks" title="mode, appear, :css=&quot;false&quot; + JS hooks" />
  <h2>Reusable transitions</h2>
  <CodeBlock title="MyFade.vue" code='<template>
  <Transition name="my-fade" v-bind="$attrs"><slot /></Transition>
</template>
<style>  /* not scoped: classes are applied to slot content */
.my-fade-enter-active, .my-fade-leave-active { transition: opacity .3s }
.my-fade-enter-from, .my-fade-leave-to { opacity: 0 }
</style>' />
  <Callout type="tip">
    Props you'll use: <code>name</code>, <code>mode</code>, <code>appear</code>, <code>:duration</code> (for nested
    transitions), <code>enter-active-class</code> etc. (for Animate.css / Tailwind), <code>type</code> (animation vs transition).
  </Callout>
</template>
