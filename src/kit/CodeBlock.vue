<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useClipboard } from '@vueuse/core'
import { CheckIcon, CopyIcon } from '@lucide/vue'
import { highlight } from './highlight'

const props = withDefaults(defineProps<{ code: string; lang?: string; title?: string }>(), {
  lang: 'vue',
  title: undefined,
})

const html = ref('')
const { copy, copied } = useClipboard({ legacy: true })

watchEffect(async (onCleanup) => {
  let stale = false
  onCleanup(() => (stale = true))
  const out = await highlight(props.code.trim(), props.lang)
  if (!stale) html.value = out
})
</script>

<template>
  <div class="group relative rounded-lg border bg-[#fff] dark:bg-[#24292e]">
    <div
      v-if="title"
      class="border-b px-4 py-1.5 font-mono text-xs text-muted-foreground"
    >
      {{ title }}
    </div>
    <button
      class="absolute top-2 right-2 z-10 rounded-md border bg-background/80 p-1.5 opacity-0 transition group-hover:opacity-100"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      @click="copy(code.trim())"
    >
      <CheckIcon v-if="copied" class="size-3.5" />
      <CopyIcon v-else class="size-3.5" />
    </button>
    <!-- eslint-disable-next-line vue/no-v-html -- shiki output is generated from our own source files -->
    <div v-if="html" v-html="html" />
    <pre v-else class="overflow-x-auto p-4 font-mono text-[0.8rem] leading-6">{{ code.trim() }}</pre>
  </div>
</template>
