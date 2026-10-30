<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'

const items = Array.from({ length: 20 }, (_, i) => `item ${i + 1}`)

// feature 1: search — grouped together, extractable as a composable
function useSearch(list: string[]) {
  const query = ref('')
  const filtered = computed(() => list.filter((i) => i.includes(query.value)))
  return { query, filtered }
}
// feature 2: pagination — works with ANY list ref
function usePagination(list: Ref<string[]>, perPage = 3) {
  const page = ref(1)
  const pages = computed(() => Math.max(1, Math.ceil(list.value.length / perPage)))
  const visible = computed(() => list.value.slice((page.value - 1) * perPage, page.value * perPage))
  return { page, pages, visible }
}

const { query, filtered } = useSearch(items)
const { page, pages, visible } = usePagination(filtered)
watch(query, () => (page.value = 1)) // the coupling is explicit
</script>

<template>
  <div class="stack">
    <input v-model="query" placeholder="search (Composition)" />
    <p class="mono">{{ visible.join(' · ') || '—' }}</p>
    <div class="row"><button :disabled="page <= 1" @click="page--">‹</button>{{ page }}/{{ pages }}<button :disabled="page >= pages" @click="page++">›</button></div>
  </div>
</template>
