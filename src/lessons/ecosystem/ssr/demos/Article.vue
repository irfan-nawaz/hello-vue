<script setup lang="ts">
import { inject, onServerPrefetch, ref, ssrContextKey, useSSRContext } from 'vue'

interface ArticleData {
  title: string
  words: number
}
const props = defineProps<{ clientValue?: string; initialArticle?: ArticleData }>()
const count = ref(0)
// on the client, start from the state the server serialized into the page
const article = ref<ArticleData | undefined>(props.initialArticle)

// Real apps: `if (import.meta.env.SSR)`. Here both renders happen in the browser,
// so detect a server render by the presence of an SSR context.
const ctx = inject(ssrContextKey, null) ? useSSRContext<{ title?: string; state?: ArticleData }>() : undefined

// SSR only: wait for data before the HTML is generated (never runs on the client)
onServerPrefetch(async () => {
  await new Promise((r) => setTimeout(r, 300))
  article.value = { title: 'Rendered on the “server”', words: 420 }
  // useSSRContext(): per-request object shared with whoever called renderToString —
  // here we use it to hand the fetched state to the page for the client
  if (ctx) {
    ctx.title = 'Article page'
    ctx.state = article.value
  }
})
</script>

<template>
  <article>
    <h4>{{ article?.title ?? 'no data' }}</h4>
    <p>Words: {{ article?.words ?? '—' }}</p>
    <!-- a value that differs between server and client → hydration mismatch -->
    <p>value: <b>{{ props.clientValue ?? 'server' }}</b></p>
    <p data-allow-mismatch="text">allowed mismatch: {{ props.clientValue ?? 'server' }}</p>
    <button @click="count++">clicks: {{ count }} (works only after hydration)</button>
  </article>
</template>
