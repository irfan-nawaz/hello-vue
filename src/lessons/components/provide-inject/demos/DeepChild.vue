<script setup lang="ts">
import { inject } from 'vue'
import { themeKey } from './keys'

const theme = inject(themeKey)! // typed via InjectionKey
const user = inject<string>('user', 'anonymous') // string key with default
const lazyDefault = inject('missing', () => `factory default @ ${new Date().toLocaleTimeString()}`, true)
</script>

<template>
  <div class="box stack" :style="{ borderColor: theme.color.value }">
    <b :style="{ color: theme.color.value }">DeepChild (3 levels down)</b>
    <span class="mono">user = {{ user }} · missing = {{ lazyDefault }}</span>
    <!-- mutate via the provided function, not directly (it's readonly) -->
    <button @click="theme.setColor('#e11d48')">setColor(red) from the child</button>
  </div>
</template>
