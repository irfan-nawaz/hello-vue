<script setup lang="ts">
import { CodeBlock, Demo } from '@/kit'
</script>

<template>
  <Demo name="ModelDemo" title="defineModel, named models, modifiers, useModel" :files="['demos/RatingInput.vue', 'demos/NameFields.vue', 'demos/ToggleUseModel.vue']" />
  <h2>What v-model on a component means</h2>
  <CodeBlock code='<RatingInput v-model="rating" />
<!-- expands to -->
<RatingInput :modelValue="rating" @update:modelValue="v => rating = v" />

<NameFields v-model:last.capitalize="last" />
<!-- expands to -->
<NameFields :last="last" :lastModifiers="{ capitalize: true }" @update:last="v => last = v" />' />
  <p>
    <code>defineModel()</code> (3.4+) declares that prop + event pair and returns a ref that syncs with it. A local
    value is kept when the parent doesn't bind <code>v-model</code>, so the component also works uncontrolled.
  </p>
</template>
