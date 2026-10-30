<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'

// 1. class-based: toggle a class to replay a CSS animation
const shaking = ref(false)
const shake = () => {
  shaking.value = true
  setTimeout(() => (shaking.value = false), 600)
}

// 2. state-driven: bind style to state, let CSS transition interpolate
const pos = reactive({ x: 0, y: 0 })
const move = (e: MouseEvent) => {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  pos.x = ((e.clientX - r.left) / r.width) * 360
  pos.y = (e.clientY - r.top) / r.height
}

// 3a. tweening with a watcher + requestAnimationFrame
const target = ref(0)
const tweened = ref(0)
watch(target, (to) => {
  const from = tweened.value
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min((now - start) / 800, 1)
    tweened.value = from + (to - from) * (1 - Math.pow(1 - t, 3)) // easeOutCubic
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
})
// 3b. the same with VueUse
const smooth = useTransition(target, { duration: 800, transition: TransitionPresets.easeOutBack })
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="box stack">
      <span class="label">class-based</span>
      <button :class="{ shake: shaking }" @click="shake">submit (invalid → shake)</button>
    </div>
    <div class="box stack">
      <span class="label">state-driven</span>
      <div
        class="h-24 rounded-lg transition-colors duration-300"
        :style="{ backgroundColor: `oklch(${0.5 + pos.y * 0.4} 0.15 ${pos.x})` }"
        @mousemove="move"
      >
        <p class="p-2 text-xs text-white">move the mouse here · hue {{ Math.round(pos.x) }}</p>
      </div>
    </div>
    <div class="box stack">
      <span class="label">tweening</span>
      <input v-model.number="target" type="number" step="100" aria-label="target number" />
      <p class="mono">watcher+rAF: <b>{{ tweened.toFixed(0) }}</b></p>
      <p class="mono">useTransition: <b>{{ smooth.toFixed(0) }}</b></p>
    </div>
  </div>
</template>

<style scoped>
.shake {
  animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
@keyframes shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}
</style>
