<script setup lang="ts">
import { ref } from 'vue'
import TypedComponent from './TypedComponent.vue'

const selected = ref<string>()
</script>

<template>
  <div class="stack">
    <!-- try (in your editor): title missing, :tags="[1]" or @select="(n: number) => …" → type errors -->
    <TypedComponent title="Typed" :tags="['vue', 'ts']" data-x="attr" @select="(t) => (selected = t)" @reset="selected = undefined" />
    <p class="mono">selected (string | undefined): {{ selected }}</p>
  </div>
</template>
