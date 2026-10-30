<script setup lang="ts">
import { ref } from 'vue'

const reactiveState = ref('Text Interpolation - Reactive')
withDefaults(defineProps<{ msg?: string }>(), { msg: 'Text Interpolation - As Prop' })
</script>

<template>
  <div class="stack">
    <!-- mustache: always rendered as plain text (HTML-escaped) -->
    <p>{{ reactiveState }}</p>
    <p>{{ msg }}</p>
    <!-- v-text: same as mustache, but replaces the whole textContent -->
    <p v-text="'v-text: ' + reactiveState" />
    <input v-model="reactiveState" aria-label="reactive text" />
  </div>
</template>
