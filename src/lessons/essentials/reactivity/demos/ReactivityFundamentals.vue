<script setup lang="ts">
import { ref } from 'vue'

// ref() wraps any value in an object with a reactive `.value`
const count = ref(0)
const increment = () => count.value++ // .value in script…
</script>

<template>
  <!-- …but refs are auto-unwrapped in the template -->
  <div class="row">
    <button @click="increment">increment</button>
    <p>{{ count }}</p>
  </div>
</template>
