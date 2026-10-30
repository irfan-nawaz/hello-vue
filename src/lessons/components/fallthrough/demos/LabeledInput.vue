<script setup lang="ts">
import { useAttrs } from 'vue'

defineProps<{ label: string }>()
// stop automatic inheritance on the root <label>…
defineOptions({ inheritAttrs: false })
// …and put them where they belong: on the inner <input>
const attrs = useAttrs()
</script>

<template>
  <label class="stack text-sm">
    {{ label }}
    <input v-bind="attrs" />
    <code class="mono text-muted-foreground">$attrs = {{ Object.keys(attrs) }}</code>
  </label>
</template>
