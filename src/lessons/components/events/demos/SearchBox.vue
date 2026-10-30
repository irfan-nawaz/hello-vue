<script setup lang="ts">
import { ref } from 'vue'

// Typed emits: event name → payload tuple
const emit = defineEmits<{
  search: [query: string, options: { exact: boolean }]
  clear: []
}>()

const q = ref('')
const exact = ref(false)
</script>

<template>
  <form class="row" @submit.prevent="emit('search', q, { exact })">
    <input v-model="q" placeholder="search…" />
    <label class="row text-sm"><input v-model="exact" type="checkbox" /> exact</label>
    <button>search</button>
    <!-- $emit is available directly in the template -->
    <button type="button" @click="q = ''; $emit('clear')">clear</button>
  </form>
</template>
