<script setup lang="ts">
import { customRef } from 'vue'

// customRef: full control over when to track() and trigger()
function useDebouncedRef<T>(value: T, delay = 500) {
  let timeout: ReturnType<typeof setTimeout>
  return customRef<T>((track, trigger) => ({
    get() {
      track() // register the current effect as a dependency
      return value
    },
    set(newValue) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        value = newValue
        trigger() // notify dependents — only after the user stops typing
      }, delay)
    },
  }))
}

const delay = 500
const text = useDebouncedRef('hello', delay)
</script>

<template>
  <div class="stack">
    <input v-model="text" placeholder="type quickly…" />
    <p>debounced value: <b class="mono">{{ text }}</b></p>
    <p class="text-xs text-muted-foreground">The input keeps your typing (DOM state); the ref only updates {{ delay }}ms after you stop.</p>
  </div>
</template>
