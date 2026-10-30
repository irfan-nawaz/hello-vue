<script setup lang="ts">
const bars = Array.from({ length: 12 }, () => 20 + Math.random() * 80)
</script>

<template>
  <div class="flex h-24 items-end gap-1">
    <div v-for="(b, i) in bars" :key="i" class="w-4 rounded-t bg-vue" :style="{ height: b + '%' }" />
  </div>
</template>
