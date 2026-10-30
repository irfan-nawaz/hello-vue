<script setup lang="ts">
import { getCurrentInstance } from 'vue'

defineProps<{ from: string }>()
// no `name` option: Vue infers "LocalChild" from the file name (used in devtools & warnings)
const inferred = getCurrentInstance()!.type.__name
</script>

<template>
  <p class="text-sm">
    <code class="mono">&lt;{{ inferred }}&gt;</code> rendered via <b>{{ from }}</b>
  </p>
</template>
