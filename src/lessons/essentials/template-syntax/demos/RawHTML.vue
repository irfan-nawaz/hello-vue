<script setup lang="ts">
import { ref } from 'vue'

const rawHtml = ref('<h1 style="color:var(--color-vue)">Hello World</h1>')
</script>

<template>
  <div class="stack">
    <textarea v-model="rawHtml" rows="2" class="font-mono text-xs" aria-label="raw html" />
    <div class="grid gap-2 sm:grid-cols-2">
      <div class="box"><div class="label">mustache — escaped</div><p>{{ rawHtml }}</p></div>
      <!-- v-html renders real HTML: never use it with user-provided content (XSS!) -->
      <div class="box"><div class="label">v-html — parsed</div><span v-html="rawHtml" /></div>
    </div>
  </div>
</template>
