<script setup lang="ts">
import { createSSRApp, ref, useTemplateRef, type App } from 'vue'
import { pipeToWebWritable, renderToSimpleStream, renderToString, renderToWebStream } from '@vue/server-renderer'
import { EventLog, useEventLog } from '@/kit'
import Article from './Article.vue'

const events = useEventLog()
const html = ref('')
const ctxOut = ref('')
const chunks = ref<string[]>([])
const host = useTemplateRef<HTMLElement>('host')
const mismatch = ref(false)
let app: App | undefined
let serializedState = '' // what a server would embed in the page, e.g. window.__STATE__ = …

async function toString() {
  app?.unmount()
  const ssrApp = createSSRApp(Article) // same component, "server" instance
  const ctx: Record<string, unknown> = {}
  html.value = await renderToString(ssrApp, ctx)
  ctxOut.value = JSON.stringify(ctx)
  serializedState = JSON.stringify(ctx.state)
  host.value!.innerHTML = html.value // pretend the server sent this HTML
  events.log(`renderToString → ${html.value.length} chars; ssrContext = ${ctxOut.value}`, 'success')
}

function hydrate() {
  // createSSRApp + mount on existing server HTML = hydration (adopt DOM, attach listeners)
  const initialArticle = JSON.parse(serializedState) // state transfer: same data → same DOM
  app = createSSRApp(Article, { initialArticle, ...(mismatch.value ? { clientValue: 'client' } : {}) })
  app.config.warnHandler = (msg) => events.log(`warn: ${msg}`, 'warn')
  app.mount(host.value!)
  events.log('hydrated — the button is now interactive', 'success')
}

async function webStream() {
  chunks.value = []
  const stream = renderToWebStream(createSSRApp(Article), {})
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  for (let r = await reader.read(); !r.done; r = await reader.read()) {
    chunks.value.push(typeof r.value === 'string' ? r.value : decoder.decode(r.value))
  }
  events.log(`renderToWebStream → ${chunks.value.length} chunks`, 'info')
}

async function pipeWeb() {
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(createSSRApp(Article), {}, writable)
  const text = await new Response(readable).text()
  events.log(`pipeToWebWritable → ${text.length} chars`, 'info')
}

function simpleStream() {
  const parts: string[] = []
  renderToSimpleStream(createSSRApp(Article), {}, {
    push(chunk) {
      if (chunk === null) events.log(`renderToSimpleStream → ${parts.length} pushes`, 'info')
      else parts.push(chunk)
    },
    destroy(err) {
      events.log(`stream error ${err}`, 'error')
    },
  })
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <div class="row">
        <button @click="toString">1. renderToString</button>
        <label class="row text-sm"><input v-model="mismatch" type="checkbox" /> client differs</label>
        <button :disabled="!html" @click="hydrate">2. hydrate</button>
      </div>
      <div ref="host" class="box min-h-24 text-sm" />
      <pre v-if="html" class="mono box overflow-x-auto whitespace-pre-wrap">{{ html }}</pre>
      <div class="row">
        <button @click="webStream">renderToWebStream</button>
        <button @click="pipeWeb">pipeToWebWritable</button>
        <button @click="simpleStream">renderToSimpleStream</button>
      </div>
      <ol v-if="chunks.length" class="mono box">
        <li v-for="(c, i) in chunks" :key="i"><b>chunk {{ i }}:</b> {{ c }}</li>
      </ol>
    </div>
    <EventLog :log="events" height="22rem" />
  </div>
</template>
