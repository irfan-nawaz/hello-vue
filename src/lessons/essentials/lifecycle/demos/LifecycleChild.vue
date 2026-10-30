<script setup lang="ts">
import { inject } from 'vue'
import { useLifecycleLogger, type EventLogApi } from '@/kit'

const props = defineProps<{ name: string; value: number }>()
useLifecycleLogger(props.name, inject<EventLogApi>('log')!)
</script>

<template>
  <span class="rounded bg-muted px-2 py-1 text-sm">{{ name }}: {{ value }}</span>
</template>
