<script setup lang="ts">
// defineModel() returns a ref that reads the `modelValue` prop and
// emits `update:modelValue` when written to
const rating = defineModel<number>({ required: true })
</script>

<template>
  <div class="row" role="radiogroup" aria-label="rating">
    <button v-for="n in 5" :key="n" :aria-pressed="n <= rating" class="text-xl" @click="rating = n">
      {{ n <= rating ? '★' : '☆' }}
    </button>
  </div>
</template>
