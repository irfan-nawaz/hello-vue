<script setup lang="ts">
import { ref } from 'vue'

// Renderless component: owns logic + state, renders only what the parent's slot decides
const x = ref(0)
const y = ref(0)
const update = (e: MouseEvent) => {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  x.value = Math.round(e.clientX - r.left)
  y.value = Math.round(e.clientY - r.top)
}
</script>

<template>
  <div class="h-24 rounded-lg border border-dashed" @mousemove="update">
    <slot :x :y />
  </div>
</template>
