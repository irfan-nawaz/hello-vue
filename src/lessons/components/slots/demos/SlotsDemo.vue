<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'
import FancyList from './FancyList.vue'
import MouseTracker from './MouseTracker.vue'

const slotName = ref<'header' | 'footer'>('header')
const items = ref([{ id: 1, name: 'Vue' }, { id: 2, name: 'Pinia' }, { id: 3, name: 'Vite' }])
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <span class="label">default + named (#header) + fallback</span>
      <Card>
        <template #header>Named slot header</template>
        Default slot content
      </Card>
      <Card />
      <span class="label">dynamic slot name</span>
      <select v-model="slotName" aria-label="slot name"><option>header</option><option>footer</option></select>
      <Card>
        <template #[slotName]>I go into “{{ slotName }}”</template>
      </Card>
    </div>
    <div class="stack">
      <span class="label">scoped slot (generic, typed with defineSlots)</span>
      <FancyList :items>
        <template #item="{ item, index, odd }">
          <span :class="odd ? 'text-vue' : ''">{{ index + 1 }}. {{ item.name }}</span>
        </template>
      </FancyList>
      <button @click="items.pop()">pop item</button>
      <span class="label">renderless component</span>
      <MouseTracker v-slot="{ x, y }">
        <p class="p-2 mono">mouse at {{ x }}, {{ y }} — markup chosen by the parent</p>
      </MouseTracker>
    </div>
  </div>
</template>
