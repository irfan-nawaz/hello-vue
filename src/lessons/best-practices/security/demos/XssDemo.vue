<script setup lang="ts">
import { computed, ref } from 'vue'

const payload = ref('<img src=x onerror="this.replaceWith(\'💥 XSS executed\')">')
const url = ref('javascript:alert(\'XSS\')')
const safe = ref(true)

// allow-list protocols for user-provided URLs
const safeUrl = computed(() => {
  try {
    const u = new URL(url.value, location.href)
    return ['http:', 'https:', 'mailto:'].includes(u.protocol) ? u.href : '#blocked'
  } catch {
    return '#blocked'
  }
})

// a tiny escape-based "sanitizer" (in real apps use DOMPurify)
const escaped = computed(() => payload.value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`))
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <label class="stack text-sm">untrusted HTML <input v-model="payload" /></label>
      <label class="row text-sm"><input v-model="safe" type="checkbox" /> sanitize before v-html</label>
      <div class="box text-sm"><span class="label">{{ '{' }}{{ '{' }} payload }} (always safe)</span><p>{{ payload }}</p></div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="box text-sm"><span class="label">v-html</span><p v-html="safe ? escaped : payload" /></div>
    </div>
    <div class="stack">
      <label class="stack text-sm">untrusted URL <input v-model="url" /></label>
      <p class="text-sm">raw <code>:href</code>: <a :href="url" class="text-red-500 underline" @click.prevent>link (click blocked in demo)</a> → <code class="mono">{{ url }}</code></p>
      <p class="text-sm">allow-listed: <a :href="safeUrl" class="text-vue underline" @click.prevent>link</a> → <code class="mono">{{ safeUrl }}</code></p>
    </div>
  </div>
</template>
