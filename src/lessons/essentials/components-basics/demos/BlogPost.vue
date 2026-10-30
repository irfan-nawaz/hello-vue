<script setup lang="ts">
// props in (data down) …
defineProps<{ title: string; likes: number }>()
// … events out (actions up)
defineEmits<{ like: []; remove: [] }>()
</script>

<template>
  <article class="box stack">
    <h4 class="font-semibold">{{ title }}</h4>
    <!-- slot: the parent passes content in -->
    <div class="text-sm text-muted-foreground"><slot>No content provided.</slot></div>
    <div class="row">
      <button @click="$emit('like')">♥ {{ likes }}</button>
      <button @click="$emit('remove')">remove</button>
    </div>
  </article>
</template>
