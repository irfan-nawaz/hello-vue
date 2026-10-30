<script setup lang="ts">
import OptionsCounter from './OptionsCounter.vue'
import CompositionCounter from './CompositionCounter.vue'
</script>

<template>
  <div class="row">
    <OptionsCounter />
    <CompositionCounter />
  </div>
  <p class="mt-3 text-sm text-muted-foreground">
    Same behaviour, two styles. Open both code tabs and compare how the logic is grouped.
  </p>
</template>
