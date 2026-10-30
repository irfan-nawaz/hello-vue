<script setup lang="ts">
import { computed, reactive, ref, type CSSProperties } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const size = ref(18)
const hue = ref(160)
const extra = ref('italic')

// object syntax, computed for readability
const classObject = computed(() => ({
  'ring-2 ring-vue': isActive.value,
  'bg-red-500/20 text-red-600': hasError.value,
}))

// CSSProperties types the style object (camelCase or kebab-case keys)
const styleObject = reactive<CSSProperties>({ fontWeight: 600 })
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <label class="row text-sm"><input v-model="isActive" type="checkbox" /> isActive</label>
      <label class="row text-sm"><input v-model="hasError" type="checkbox" /> hasError</label>
      <label class="row text-sm">font size {{ size }}px <input v-model.number="size" type="range" min="10" max="36" /></label>
      <label class="row text-sm">hue {{ hue }} <input v-model.number="hue" type="range" min="0" max="360" /></label>
      <select v-model="extra" aria-label="extra class"><option>italic</option><option>underline</option><option value="">(none)</option></select>
    </div>
    <div class="stack">
      <p
        class="rounded-lg p-4 transition-all"
        :class="[classObject, extra, { 'opacity-50': !isActive }]"
        :style="[styleObject, { fontSize: size + 'px', color: `oklch(0.6 0.15 ${hue})` }]"
      >
        Styled by bindings
      </p>
      <span class="label">resulting attributes</span>
      <code class="mono break-all">class="{{ ['rounded-lg p-4 transition-all', ...Object.entries(classObject).filter(([, v]) => v).map(([k]) => k), extra, !isActive ? 'opacity-50' : ''].filter(Boolean).join(' ') }}"</code>
      <code class="mono break-all">style="font-weight: 600; font-size: {{ size }}px; color: oklch(0.6 0.15 {{ hue }})"</code>
    </div>
  </div>
</template>
