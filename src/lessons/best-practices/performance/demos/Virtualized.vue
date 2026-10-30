<script setup lang="ts">
import { ref } from 'vue'
import { useVirtualList } from '@vueuse/core'

const count = ref(100_000)
const all = Array.from({ length: 100_000 }, (_, i) => `Row #${i}`)
// only the visible rows (+ overscan) exist in the DOM
const { list, containerProps, wrapperProps } = useVirtualList(all, { itemHeight: 24, overscan: 5 })
</script>

<template>
  <div class="stack">
    <p class="text-sm">{{ count.toLocaleString() }} rows, but only <b>{{ list.length }}</b> DOM nodes (VueUse <code>useVirtualList</code>).</p>
    <div v-bind="containerProps" class="h-48 rounded border">
      <div v-bind="wrapperProps">
        <div v-for="row in list" :key="row.index" class="mono h-6 px-2 leading-6">{{ row.data }}</div>
      </div>
    </div>
  </div>
</template>
