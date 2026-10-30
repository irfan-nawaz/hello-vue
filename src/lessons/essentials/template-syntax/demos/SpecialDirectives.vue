<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="stack">
    <button @click="count++">count++ ({{ count }})</button>
    <!-- v-once: rendered once, then treated as static forever -->
    <p v-once>v-once: initial count was {{ count }}</p>
    <!-- v-pre: skip compilation, mustaches shown verbatim -->
    <p v-pre>v-pre: {{ count }} is not compiled</p>
    <!-- v-cloak: stays on the element until the app is mounted. With CSS
         [v-cloak] { display: none } it hides raw mustaches in in-DOM templates -->
    <p v-cloak>v-cloak is removed after mount (inspect me — no attribute)</p>
  </div>
</template>
