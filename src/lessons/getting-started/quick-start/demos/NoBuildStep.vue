<script setup lang="ts">
import { createApp, onBeforeUnmount, ref, useTemplateRef, type App } from 'vue'

// This is the "CDN" way: an options object with a string `template`,
// compiled in the browser at runtime (needs the full build / a runtime compiler).
const template = ref(`<button @click="count++">You clicked {{ count }} times</button>
<p v-if="count > 2">🎉 runtime-compiled!</p>`)

const host = useTemplateRef<HTMLDivElement>('host')
const error = ref('')
let app: App | undefined

function run() {
  app?.unmount()
  error.value = ''
  try {
    app = createApp({ data: () => ({ count: 0 }), template: template.value })
    app.config.errorHandler = (e) => (error.value = String(e))
    app.mount(host.value!)
  } catch (e) {
    error.value = String(e)
  }
}

onBeforeUnmount(() => app?.unmount())
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <span class="label">template string</span>
      <textarea v-model="template" rows="5" class="font-mono text-xs" aria-label="template" />
      <div class="row"><button @click="run">createApp(…).mount()</button></div>
      <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
    </div>
    <div class="stack">
      <span class="label">mounted app</span>
      <div ref="host" class="box min-h-24" />
    </div>
  </div>
</template>
