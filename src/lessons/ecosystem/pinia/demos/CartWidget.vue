<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from './cartStore'
import { usePrefsStore } from './prefsStore'

// a second component using the SAME store instance — state is shared
const cart = useCartStore()
// storeToRefs: destructure state & getters without losing reactivity (actions: destructure directly)
const { count, total } = storeToRefs(cart)
const { symbol } = storeToRefs(usePrefsStore())
</script>

<template>
  <div class="box row justify-between">
    <span>🛒 CartWidget (another component)</span>
    <b>{{ count }} items · {{ symbol }}{{ total.toFixed(2) }}</b>
  </div>
</template>
