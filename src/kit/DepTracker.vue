<script setup lang="ts">
import type { DepTrackerApi } from './useDepTracker'

defineProps<{ tracker: DepTrackerApi }>()
</script>

<template>
  <div class="grid gap-3 rounded-lg border bg-muted/30 p-3 text-xs sm:grid-cols-2">
    <div>
      <div class="mb-2 flex items-center justify-between">
        <span class="font-medium tracking-wide text-muted-foreground uppercase">
          Tracked by last render
        </span>
        <span class="rounded bg-vue/15 px-1.5 py-0.5 font-mono text-vue">
          render #{{ tracker.renders.value }}
        </span>
      </div>
      <TransitionGroup tag="ul" name="dep" class="flex flex-wrap gap-1">
        <li
          v-for="d in tracker.tracked.value"
          :key="d"
          class="rounded border border-vue/40 bg-vue/10 px-1.5 py-0.5 font-mono"
        >
          {{ d }}
        </li>
      </TransitionGroup>
      <p v-if="!tracker.tracked.value.length" class="text-muted-foreground italic">
        (dev mode only — nothing tracked yet)
      </p>
    </div>
    <div>
      <div class="mb-2 font-medium tracking-wide text-muted-foreground uppercase">
        Re-render triggered by
      </div>
      <TransitionGroup tag="ol" name="dep" class="space-y-1">
        <li
          v-for="t in tracker.triggers.value"
          :key="t.id"
          class="rounded border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 font-mono"
        >
          <b>{{ t.type }}</b> {{ t.dep }}
          <span v-if="t.oldValue !== undefined || t.newValue !== undefined" class="text-muted-foreground">
            {{ t.oldValue ?? '∅' }} → {{ t.newValue ?? '∅' }}
          </span>
        </li>
      </TransitionGroup>
      <p v-if="!tracker.triggers.value.length" class="text-muted-foreground italic">
        Mutate state to trigger a render
      </p>
    </div>
  </div>
</template>

<style scoped>
.dep-enter-active {
  transition: all 0.4s ease;
}
.dep-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
</style>
