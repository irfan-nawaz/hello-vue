<script setup lang="ts">
import type { EventLogApi, LogKind } from './useEventLog'

withDefaults(defineProps<{ log: EventLogApi; title?: string; height?: string }>(), {
  title: 'Event log',
  height: '14rem',
})

const colors: Record<LogKind, string> = {
  info: 'bg-sky-500',
  success: 'bg-vue',
  warn: 'bg-amber-500',
  error: 'bg-red-500',
  hook: 'bg-violet-500',
  event: 'bg-pink-500',
  effect: 'bg-teal-500',
}
</script>

<template>
  <div class="rounded-lg border bg-muted/30">
    <div class="flex items-center justify-between border-b px-3 py-1.5">
      <span class="text-xs font-medium tracking-wide text-muted-foreground uppercase">{{ title }}</span>
      <button class="text-xs text-muted-foreground hover:text-foreground" @click="log.clear()">
        clear
      </button>
    </div>
    <ol class="overflow-y-auto p-2 font-mono text-xs" :style="{ height }" aria-live="polite">
      <li v-if="!log.entries.value.length" class="p-1 text-muted-foreground italic">
        Interact with the demo…
      </li>
      <TransitionGroup name="log">
        <li
          v-for="e in log.entries.value"
          :key="e.id"
          class="flex items-start gap-2 rounded px-1 py-0.5 hover:bg-muted"
        >
          <span :class="['mt-1.5 size-1.5 shrink-0 rounded-full', colors[e.kind]]" />
          <span class="w-12 shrink-0 text-right text-muted-foreground tabular-nums">{{ e.t }}ms</span>
          <span class="break-all">
            {{ e.msg }}
            <span v-if="e.detail" class="text-muted-foreground"> {{ e.detail }}</span>
          </span>
        </li>
      </TransitionGroup>
    </ol>
  </div>
</template>

<style scoped>
.log-enter-active {
  transition: all 0.3s ease;
}
.log-enter-from {
  opacity: 0;
  transform: translateX(-8px);
  background: oklch(0.69 0.14 160 / 0.3);
}
</style>
