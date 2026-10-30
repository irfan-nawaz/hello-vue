<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// Composition API: logic is organised by feature, using imported functions
const count = ref(0)
const double = computed(() => count.value * 2)
const increment = () => count.value++

onMounted(() => console.log(`Composition counter mounted with ${count.value}`))
</script>

<template>
  <button @click="increment">Composition: {{ count }} (double {{ double }})</button>
</template>
