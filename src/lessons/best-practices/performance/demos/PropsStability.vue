<script setup lang="ts">
import { ref } from 'vue'
import Row from './Row.vue'

const items = Array.from({ length: 6 }, (_, i) => ({ id: i, label: `Row ${i}` }))
const activeId = ref(0)
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="box stack">
      <span class="label text-red-500">❌ passes activeId to every row</span>
      <!-- every Row receives a changed prop → ALL rows re-render -->
      <ul><Row v-for="item in items" :key="item.id" :label="item.label + ' (activeId=' + activeId + ')'" :active="item.id === activeId" @click="activeId = item.id" /></ul>
    </div>
    <div class="box stack">
      <span class="label text-vue">✅ passes a stable boolean</span>
      <!-- only the two rows whose `active` flipped re-render -->
      <ul><Row v-for="item in items" :key="item.id" :label="item.label" :active="item.id === activeId" @click="activeId = item.id" /></ul>
    </div>
    <p class="text-xs text-muted-foreground md:col-span-2">Click rows. Watch the render counters.</p>
  </div>
</template>
