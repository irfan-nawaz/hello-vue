<script setup lang="ts" generic="T extends { id: number }">
// defineSlots: type the slots (and their scope props) for consumers
defineProps<{ items: T[] }>()
defineSlots<{
  item(props: { item: T; index: number; odd: boolean }): unknown
  empty?(): unknown
}>()
</script>

<template>
  <ul class="stack">
    <!-- scoped slot: the CHILD passes data up to the parent's slot content -->
    <li v-for="(item, index) in items" :key="item.id">
      <slot name="item" :item :index :odd="index % 2 === 1" />
    </li>
    <li v-if="!items.length"><slot name="empty">Nothing here</slot></li>
  </ul>
</template>
