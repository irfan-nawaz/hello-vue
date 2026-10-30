<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ max?: number; buggy?: boolean }>()
const likes = defineModel<number>({ default: 0 })
const full = computed(() => props.max !== undefined && likes.value >= props.max)

function like() {
  if (full.value && !props.buggy) return
  likes.value += props.buggy ? 2 : 1 // the "bug" double counts and ignores max
}
</script>

<template>
  <button :disabled="full && !buggy" data-testid="like" @click="like">♥ {{ likes }}</button>
</template>
