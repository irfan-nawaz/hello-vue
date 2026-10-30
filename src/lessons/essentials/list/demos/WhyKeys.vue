<script setup lang="ts">
import { ref } from 'vue'

const people = ref([
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Grace' },
  { id: 3, name: 'Linus' },
])
const shuffle = () => (people.value = [...people.value].sort(() => Math.random() - 0.5))
const prepend = () => people.value.unshift({ id: Date.now(), name: 'New' })
</script>

<template>
  <div class="stack">
    <p class="text-sm">Type something in each input, then shuffle or prepend.</p>
    <div class="row"><button @click="shuffle">shuffle</button><button @click="prepend">prepend</button></div>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="box">
        <div class="label mb-2 text-red-500">no key (patched in place by index)</div>
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div v-for="p in people" class="row mb-1"><span class="w-14">{{ p.name }}</span><input placeholder="note" /></div>
      </div>
      <div class="box">
        <div class="label mb-2 text-vue">:key="p.id" (DOM nodes move with data)</div>
        <div v-for="p in people" :key="p.id" class="row mb-1"><span class="w-14">{{ p.name }}</span><input placeholder="note" /></div>
      </div>
    </div>
  </div>
</template>
