<script setup lang="ts">
import { useRenderCount } from '@/kit'

defineProps<{ label: string; active: boolean }>()
useRenderCount('renders') // writes this component's render count straight into the badge
</script>

<template>
  <li :class="['row rounded px-2', active ? 'bg-vue/20' : '']">
    {{ label }} <span ref="renders" class="mono ml-auto rounded px-1 text-muted-foreground" />
  </li>
</template>
