<script setup lang="ts">
import { computed } from 'vue'
import { serialize } from './serialize'

const props = withDefaults(defineProps<{ value: unknown; label?: string }>(), {
  label: 'state',
})

// serialize() walks every nested key, so this computed deeply tracks `value`
const text = computed(() => serialize(props.value))
</script>

<template>
  <div class="rounded-lg border bg-muted/30">
    <div class="border-b px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
      {{ label }}
    </div>
    <pre class="max-h-72 overflow-auto p-3 font-mono text-xs leading-5">{{ text }}</pre>
  </div>
</template>
