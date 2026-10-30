<script setup lang="ts">
const props = defineProps<{ ms: number; fail?: boolean }>()

// top-level await makes this an *async setup* component — it needs a <Suspense> ancestor
const user = await new Promise<{ name: string }>((resolve, reject) =>
  setTimeout(() => (props.fail ? reject(new Error('Profile API failed')) : resolve({ name: 'Ada' })), props.ms),
)
</script>

<template>
  <p class="box">👤 Profile loaded: <b>{{ user.name }}</b> ({{ ms }}ms)</p>
</template>
