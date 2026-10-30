<script setup lang="ts">
import { computed, watchEffect } from 'vue'

interface Props {
  name: string
  age?: number
  role?: 'admin' | 'user'
  tags?: string[]
  verified?: boolean // Boolean props are cast: <UserCard verified /> → true
}

// 3.5+: destructure with defaults — still reactive (compiled to props.name etc.)
const { name, age = 18, role = 'user', tags = ['new'], verified } = defineProps<Props>()
// (no factory needed for object/array defaults with destructuring)

// ❌ props are readonly: `name = 'x'` would warn. Derive instead:
const initials = computed(() => name.split(' ').map((p) => p[0]).join(''))

// watching a destructured prop needs a getter
watchEffect(() => console.log('UserCard age is now', age))
</script>

<template>
  <div class="box row">
    <span class="grid size-10 place-items-center rounded-full bg-vue font-bold text-white">{{ initials }}</span>
    <div>
      <b>{{ name }}</b> <span v-if="verified">✔</span>
      <div class="text-xs text-muted-foreground">age {{ age }} · {{ role }} · {{ tags.join(', ') }}</div>
    </div>
  </div>
</template>
