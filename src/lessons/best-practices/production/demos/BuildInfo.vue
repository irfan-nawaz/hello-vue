<script setup lang="ts">
// These identifiers are replaced at build time by Vite's `define` (see vite.config.ts) —
// the bundler then drops dead branches, e.g. all Options API code when false.
const flags = {
  __VUE_OPTIONS_API__,
  __VUE_PROD_DEVTOOLS__,
  __VUE_PROD_HYDRATION_MISMATCH_DETAILS__,
}
const mode = import.meta.env.MODE
const dev = import.meta.env.DEV
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="box">
      <div class="label mb-2">compile-time flags in this build</div>
      <p v-for="(v, k) in flags" :key="k" class="mono">{{ k }} = <b :class="v ? 'text-vue' : 'text-muted-foreground'">{{ v }}</b></p>
    </div>
    <div class="box">
      <div class="label mb-2">this build</div>
      <p class="mono">mode = {{ mode }} · dev = {{ dev }}</p>
      <p class="text-xs text-muted-foreground">
        In dev: warnings, devtools, onRenderTracked/Triggered and hydration mismatch details. In prod builds those
        are stripped (unless re-enabled with the flags) — try <code>pnpm build &amp;&amp; pnpm preview</code> and revisit the DepTracker.
      </p>
    </div>
  </div>
</template>
