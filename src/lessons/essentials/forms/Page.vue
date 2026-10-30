<script setup lang="ts">
import { CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>v-model</code> is two-way binding sugar. On native elements it picks the right property and event for you:
    <code>value</code> + <code>input</code> for text, <code>checked</code> + <code>change</code> for checkboxes/radios,
    <code>value</code> + <code>change</code> for selects.
  </p>
  <CodeBlock code='<input v-model="text" />
<!-- is the same as -->
<input :value="text" @input="text = $event.target.value" />' />
  <Demo name="AllInputs" title="Every input type" />
  <p>
    It ignores the initial <code>value</code>/<code>checked</code>/<code>selected</code> attributes: state is the single
    source of truth. For components, see <RouterLink to="/components/v-model">Component v-model</RouterLink>.
  </p>
</template>
