<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const ms = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function start() {
  timer ??= setInterval(() => (ms.value += 100), 100)
}
function stop() {
  clearInterval(timer)
  timer = undefined
}
onUnmounted(stop)

// <script setup> components are CLOSED by default: parents see nothing
// unless it is exposed explicitly
defineExpose({ start, stop, reset: () => (ms.value = 0) })
</script>

<template>
  <span class="mono rounded bg-muted px-2 py-1 text-lg">{{ (ms / 1000).toFixed(1) }}s</span>
</template>
