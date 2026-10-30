<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { neighbours } from '@/lessons/registry'
import { sections } from '@/lessons/sections'
import type { Lesson } from '@/lessons/types'
import { useProgressStore } from '@/stores/progress'

const props = defineProps<{ lesson: Lesson }>()
const progress = useProgressStore()
const section = computed(() => sections.find((s) => s.id === props.lesson.section))
const nav = computed(() => neighbours(props.lesson))
const done = computed({
  get: () => progress.isDone(props.lesson.path),
  set: () => progress.toggle(props.lesson.path),
})
</script>

<template>
  <article class="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
    <header class="mb-6 border-b pb-6">
      <p class="mb-1 text-sm font-medium text-vue">{{ section?.title }}</p>
      <h1 class="text-3xl font-bold tracking-tight">{{ lesson.title }}</h1>
      <p class="mt-2 text-muted-foreground">{{ lesson.summary }}</p>
      <div class="mt-4 flex flex-wrap gap-1.5">
        <Badge v-for="g in lesson.guide" :key="g" variant="secondary">{{ g }}</Badge>
        <Badge v-for="a in lesson.apis" :key="a" variant="outline" class="font-mono">{{ a }}</Badge>
      </div>
      <div class="mt-4 flex flex-wrap items-center gap-4 text-sm">
        <label class="flex cursor-pointer items-center gap-2">
          <Checkbox v-model="done" /> Mark as learned
        </label>
        <a v-if="lesson.docs" :href="lesson.docs" target="_blank" rel="noopener" class="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <BookOpenIcon class="size-4" /> Official docs
        </a>
      </div>
    </header>

    <div class="lesson-prose">
      <slot />
    </div>

    <nav class="mt-12 grid gap-3 border-t pt-6 sm:grid-cols-2" aria-label="Lesson navigation">
      <RouterLink v-if="nav.prev" :to="nav.prev.path" class="rounded-lg border p-3 hover:bg-muted">
        <span class="flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeftIcon class="size-3" /> Previous</span>
        <span class="font-medium">{{ nav.prev.title }}</span>
      </RouterLink>
      <span v-else />
      <RouterLink v-if="nav.next" :to="nav.next.path" class="rounded-lg border p-3 text-right hover:bg-muted">
        <span class="flex items-center justify-end gap-1 text-xs text-muted-foreground">Next <ArrowRightIcon class="size-3" /></span>
        <span class="font-medium">{{ nav.next.title }}</span>
      </RouterLink>
    </nav>
  </article>
</template>
