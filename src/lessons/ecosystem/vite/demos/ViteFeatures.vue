<script setup lang="ts">
import { ref } from 'vue'
import faviconUrl from '/favicon.ico?url' // ?url → the final (hashed) asset URL
import pkgRaw from '/package.json?raw' // ?raw → file contents as a string

// import.meta.glob: compile-time file matching. This is how the lab finds its lessons!
const metas = import.meta.glob('/src/lessons/*/*/meta.ts')
const demos = import.meta.glob('/src/lessons/*/*/demos/*.vue')

const env = {
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL,
  VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
}
const deps = Object.keys(JSON.parse(pkgRaw).dependencies)

// dynamic import() → a separate chunk, fetched on demand
const chunk = ref('')
async function loadChunk() {
  const t = performance.now()
  const { compile } = await import('@vue/compiler-dom')
  chunk.value = `loaded @vue/compiler-dom chunk in ${(performance.now() - t).toFixed(0)}ms (typeof compile: ${typeof compile})`
}

// HMR API: data survives hot updates of this module (edit this file while the demo is open!)
const hmr = !!import.meta.hot
const hotCount = ref<number>(import.meta.hot?.data.count ?? 0)
function bump() {
  hotCount.value++
  if (import.meta.hot) import.meta.hot.data.count = hotCount.value
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="box stack">
      <span class="label">import.meta.glob</span>
      <p>{{ Object.keys(metas).length }} lesson metas · {{ Object.keys(demos).length }} demo components found at build time</p>
      <span class="label">asset queries</span>
      <p class="row">?url → <img :src="faviconUrl" alt="" class="size-5" /> <code class="mono">{{ faviconUrl }}</code></p>
      <p class="mono">?raw package.json deps: {{ deps.join(', ') }}</p>
    </div>
    <div class="box stack">
      <span class="label">import.meta.env</span>
      <pre class="mono">{{ env }}</pre>
      <span class="label">code splitting</span>
      <button @click="loadChunk">dynamic import()</button>
      <p class="mono">{{ chunk }}</p>
      <span class="label">HMR state (import.meta.hot.data)</span>
      <div class="row"><button @click="bump">count {{ hotCount }}</button> <span class="text-xs text-muted-foreground">{{ hmr ? 'HMR active' : 'no HMR in prod' }}</span></div>
    </div>
  </div>
</template>
