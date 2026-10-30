<script setup lang="ts">
// multiple named models: v-model:first and v-model:last
const first = defineModel<string>('first')
// custom modifier: v-model:last.capitalize
const [last, modifiers] = defineModel<string, 'capitalize'>('last', {
  set(value) {
    return modifiers.capitalize && value ? value[0]!.toUpperCase() + value.slice(1) : value
  },
})
</script>

<template>
  <div class="row">
    <input v-model="first" placeholder="first" />
    <input v-model="last" placeholder="last (.capitalize)" />
  </div>
</template>
