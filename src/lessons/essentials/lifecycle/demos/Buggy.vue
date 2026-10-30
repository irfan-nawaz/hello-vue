<script setup lang="ts">
import { ref } from 'vue'

const broken = ref(false)
</script>

<template>
  <button @click="broken = true">render a broken child</button>
  <!-- reading a property of undefined throws during render -->
  <span v-if="broken">{{ (undefined as unknown as { x: string }).x }}</span>
</template>
