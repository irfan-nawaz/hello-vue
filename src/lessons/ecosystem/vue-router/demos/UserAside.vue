<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <p class="text-xs text-muted-foreground">named view “aside” · meta.title = {{ route.meta.title }}</p>
</template>
