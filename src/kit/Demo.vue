<script setup lang="ts">
import { computed, defineAsyncComponent, onErrorCaptured, ref, shallowRef, watchEffect, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { RotateCcwIcon } from '@lucide/vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeBlock from './CodeBlock.vue'

/**
 * A live demo card: Preview | Code tabs.
 * `name` is a file in the current lesson's `demos/` folder, e.g. name="Counter" →
 * src/lessons/<section>/<slug>/demos/Counter.vue. The preview and the code
 * shown are the very same file, so what you read is what runs.
 */
const props = defineProps<{
  name: string
  title?: string
  /** extra files (relative to the lesson folder) to show as code tabs, e.g. ['demos/Child.vue'] */
  files?: string[]
}>()

const demos = import.meta.glob<Component>('/src/lessons/*/*/demos/**/*.vue', { import: 'default' })
const sources = import.meta.glob<string>('/src/lessons/*/*/**/*.{vue,ts}', {
  query: '?raw',
  import: 'default',
})

const route = useRoute()
const base = computed(() => {
  const lesson = route.matched[0]?.meta.lesson
  return lesson ? `/src/lessons/${lesson.section}/${lesson.slug}` : ''
})
const demoPath = computed(() => `${base.value}/demos/${props.name}.vue`)
const codeFiles = computed(() => [`demos/${props.name}.vue`, ...(props.files ?? [])])

const demo = computed(() => {
  const loader = demos[demoPath.value]
  return loader
    ? defineAsyncComponent(loader)
    : () => `Missing demo ${demoPath.value}`
})

const code = shallowRef<Record<string, string>>({})
watchEffect(async () => {
  const entries = await Promise.all(
    codeFiles.value.map(async (f) => [f, (await sources[`${base.value}/${f}`]?.()) ?? `// ${f} not found`]),
  )
  code.value = Object.fromEntries(entries)
})

const runKey = ref(0)
const error = ref<string>()
function rerun() {
  error.value = undefined
  runKey.value++
}

// Error boundary: a failing demo shows its error instead of breaking the page
onErrorCaptured((err) => {
  error.value = err instanceof Error ? err.message : String(err)
  return false
})

const lang = (file: string) => (file.endsWith('.ts') ? 'ts' : 'vue')
</script>

<template>
  <section class="not-prose my-6 overflow-hidden rounded-xl border bg-card shadow-xs">
    <Tabs default-value="preview">
      <div class="flex flex-wrap items-center gap-2 border-b bg-muted/40 px-3 py-2">
        <span class="mr-auto text-sm font-semibold">{{ title ?? name }}</span>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger v-for="f in codeFiles" :key="f" :value="f" class="font-mono text-xs">
            {{ f.split('/').pop() }}
          </TabsTrigger>
        </TabsList>
        <button
          class="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          title="Re-mount the demo (fresh state)"
          aria-label="Re-mount the demo"
          @click="rerun"
        >
          <RotateCcwIcon class="size-4" />
        </button>
      </div>
      <div v-if="$slots.default" class="lesson-prose border-b px-4 py-1 text-sm">
        <slot />
      </div>
      <TabsContent value="preview" class="demo m-0 p-4 data-[state=inactive]:hidden" force-mount>
        <p v-if="error" data-demo-error class="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-600">
          Demo crashed: {{ error }}
        </p>
        <Suspense v-else>
          <component :is="demo" :key="runKey" />
          <template #fallback>
            <p class="animate-pulse text-sm text-muted-foreground">Loading demo…</p>
          </template>
        </Suspense>
      </TabsContent>
      <TabsContent v-for="f in codeFiles" :key="f" :value="f" class="m-0 p-3">
        <CodeBlock :code="code[f] ?? ''" :lang="lang(f)" class="max-h-[32rem] overflow-auto" />
      </TabsContent>
    </Tabs>
  </section>
</template>
