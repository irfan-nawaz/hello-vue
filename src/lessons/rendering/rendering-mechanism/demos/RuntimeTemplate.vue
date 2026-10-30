<script setup lang="ts">
import { createApp, onBeforeUnmount, onMounted, ref, useTemplateRef, watch, type App } from 'vue'

// `template` option + per-component compilerOptions — compiled at runtime in the browser
const whitespace = ref<'condense' | 'preserve'>('condense')
const comments = ref(true)
const host = useTemplateRef<HTMLElement>('host')
let app: App | undefined

function mount() {
  app?.unmount()
  app = createApp({
    data: () => ({ name: 'Vue' }),
    compilerOptions: { delimiters: ['${', '}'], whitespace: whitespace.value, comments: comments.value },
    template: `<p style="white-space: pre; border: 1px dashed; padding: 4px">Hello   \${ name }   !</p><!-- a comment -->`,
  })
  app.mount(host.value!)
}
onMounted(mount)
watch([whitespace, comments], mount)
onBeforeUnmount(() => app?.unmount())
</script>

<template>
  <div class="stack">
    <div class="row text-sm">
      <select v-model="whitespace" aria-label="whitespace"><option>condense</option><option>preserve</option></select>
      <label class="row"><input v-model="comments" type="checkbox" /> keep comments</label>
    </div>
    <div ref="host" />
    <p class="text-xs text-muted-foreground">Delimiters changed to <code>${ }</code>. Inspect the DOM to see whitespace and comment handling.</p>
  </div>
</template>
