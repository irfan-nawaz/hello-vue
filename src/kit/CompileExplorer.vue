<script setup lang="ts">
import { computed, ref } from 'vue'
import { compile } from '@vue/compiler-dom'
import { refDebounced } from '@vueuse/core'
import CodeBlock from './CodeBlock.vue'
import { PatchFlagHelp } from './flags'

const props = withDefaults(defineProps<{ template: string; height?: string }>(), {
  height: '12rem',
})

const source = ref(props.template.trim())
const debounced = refDebounced(source, 250)
const hoistStatic = ref(true)
const cacheHandlers = ref(true)

const result = computed(() => {
  const errors: string[] = []
  try {
    const { code } = compile(debounced.value, {
      mode: 'module',
      prefixIdentifiers: true,
      hoistStatic: hoistStatic.value,
      cacheHandlers: cacheHandlers.value,
      onError: (e) => errors.push(e.message),
    })
    return { code, errors }
  } catch (e) {
    return { code: '', errors: [...errors, (e as Error).message] }
  }
})

// Every `/* FLAG */` comment the compiler leaves next to a patch flag number
const flags = computed(() => {
  const found = new Map<string, number>()
  for (const [, names] of result.value.code.matchAll(/-?\d+ \/\* ([A-Z_, |]+) \*\//g)) {
    for (const name of names!.split(/[,|]\s*/)) found.set(name.trim(), (found.get(name.trim()) ?? 0) + 1)
  }
  return [...found]
})
const cachedCount = computed(() => (result.value.code.match(/_cache\[\d+\] \|\|/g) ?? []).length)
</script>

<template>
  <div class="demo grid gap-3 lg:grid-cols-2">
    <div class="stack">
      <div class="row justify-between">
        <span class="label">Template (edit me)</span>
        <label class="row text-xs"><input v-model="hoistStatic" type="checkbox" /> hoistStatic</label>
        <label class="row text-xs"><input v-model="cacheHandlers" type="checkbox" /> cacheHandlers</label>
      </div>
      <textarea
        v-model="source"
        spellcheck="false"
        class="w-full font-mono text-xs leading-5"
        :style="{ height }"
        aria-label="Template source"
      />
      <div class="box text-xs">
        <div class="label mb-2">Compiler hints found</div>
        <ul class="space-y-1">
          <li v-for="[name, count] in flags" :key="name">
            <code class="rounded bg-vue/15 px-1 text-vue">{{ name }}</code> ×{{ count }} —
            <span class="text-muted-foreground">{{ PatchFlagHelp[name] ?? '' }}</span>
          </li>
          <li v-if="cachedCount">
            <code class="rounded bg-vue/15 px-1 text-vue">_cache[i]</code> ×{{ cachedCount }} —
            <span class="text-muted-foreground">nodes/handlers created once, reused every render</span>
          </li>
          <li v-if="!flags.length && !cachedCount" class="text-muted-foreground italic">
            fully static — nothing to diff
          </li>
        </ul>
      </div>
      <p v-for="e in result.errors" :key="e" class="text-xs text-red-500">⚠ {{ e }}</p>
    </div>
    <div class="min-w-0">
      <div class="label mb-2">Compiled render function</div>
      <CodeBlock :code="result.code" lang="js" />
    </div>
  </div>
</template>
