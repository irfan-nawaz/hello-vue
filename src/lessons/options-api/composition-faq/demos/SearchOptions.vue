<script lang="ts">
// Options API: the two features (search + pagination) are interleaved across options
export default {
  data: () => ({ query: '', page: 1, perPage: 3, items: Array.from({ length: 20 }, (_, i) => `item ${i + 1}`) }),
  computed: {
    filtered(): string[] { return this.items.filter((i) => i.includes(this.query)) }, // search
    pages(): number { return Math.max(1, Math.ceil(this.filtered.length / this.perPage)) }, // pagination
    visible(): string[] { return this.filtered.slice((this.page - 1) * this.perPage, this.page * this.perPage) }, // pagination
  },
  watch: {
    query() { this.page = 1 }, // search ↔ pagination coupling
  },
}
</script>

<template>
  <div class="stack">
    <input v-model="query" placeholder="search (Options)" />
    <p class="mono">{{ visible.join(' · ') || '—' }}</p>
    <div class="row"><button :disabled="page <= 1" @click="page--">‹</button>{{ page }}/{{ pages }}<button :disabled="page >= pages" @click="page++">›</button></div>
  </div>
</template>
