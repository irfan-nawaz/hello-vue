<script setup lang="ts">
import { inject, ref } from 'vue'
import { useLifecycleLogger, type EventLogApi } from '@/kit'

const props = defineProps<{ label: string }>()
const count = ref(0)
const text = ref('')
useLifecycleLogger(props.label, inject<EventLogApi>('log')!)
</script>

<template>
  <div class="row">
    <b>{{ label }}</b>
    <button @click="count++">count {{ count }}</button>
    <input v-model="text" placeholder="type, switch, come back" />
  </div>
</template>
