<script setup lang="ts">
import { reactive } from 'vue'
import { StateInspector } from '@/kit'

// 1. Reactivity: Vue tracks reads/writes of this state…
const state = reactive({ count: 0, name: 'Vue' })
</script>

<template>
  <!-- 2. Declarative rendering: …and re-renders this template whenever it changes -->
  <div class="grid gap-4 sm:grid-cols-2">
    <div class="stack">
      <p class="text-lg">Hello <b>{{ state.name }}</b>, you clicked {{ state.count }} times.</p>
      <div class="row">
        <button @click="state.count++">count++</button>
        <input v-model="state.name" aria-label="name" />
      </div>
    </div>
    <StateInspector :value="state" label="reactive state" />
  </div>
</template>
