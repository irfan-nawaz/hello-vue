<script setup lang="ts">
import SearchOptions from './SearchOptions.vue'
import SearchComposition from './SearchComposition.vue'
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="box"><div class="label mb-2">Options API</div><SearchOptions /></div>
    <div class="box"><div class="label mb-2">Composition API</div><SearchComposition /></div>
  </div>
</template>
