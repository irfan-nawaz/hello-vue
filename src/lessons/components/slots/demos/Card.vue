<script setup lang="ts">
import { useSlots } from 'vue'

// $slots / useSlots(): check which slots the parent actually provided
const slots = useSlots()
</script>

<template>
  <div class="box stack">
    <header v-if="$slots.header" class="font-semibold"><slot name="header" /></header>
    <slot>Default fallback content</slot>
    <footer v-if="slots.footer" class="border-t pt-2 text-xs text-muted-foreground"><slot name="footer" /></footer>
    <p class="mono text-muted-foreground">provided: {{ Object.keys($slots).join(', ') || 'none' }}</p>
  </div>
</template>
