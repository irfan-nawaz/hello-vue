<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRightIcon, CodeIcon, EyeIcon, MousePointerClickIcon } from '@lucide/vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { lessons, lessonsBySection } from '@/lessons/registry'
import { allApis } from '@/lessons/api-index'
import { useProgressStore } from '@/stores/progress'
import { sectionIcons } from '@/components/app/sectionIcons'

const progress = useProgressStore()
const first = lessons[0]
const pillars = [
  { icon: MousePointerClickIcon, title: 'Poke it', text: 'Every concept is a live demo you can click, type into and break.' },
  { icon: EyeIcon, title: 'See inside', text: 'Visualizers show dependency tracking, lifecycle order, compiled output and vnodes.' },
  { icon: CodeIcon, title: 'Read the real code', text: 'The Code tab shows the exact file running in the preview — no drift.' },
]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10 md:px-8">
    <section class="mb-10">
      <p class="mb-2 text-sm font-medium text-vue">Vue 3.5 · Router · Pinia · Colada · VueUse · Vite · Vitest · shadcn-vue</p>
      <h1 class="text-4xl font-bold tracking-tight md:text-5xl">Learn Vue by poking it.</h1>
      <p class="mt-3 max-w-2xl text-lg text-muted-foreground">
        {{ lessons.length }} interactive lessons covering the whole guide and {{ allApis.length }} API
        reference entries — each with a playground, its source, and a view of what Vue does under the hood.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <RouterLink
          v-if="first"
          :to="first.path"
          class="inline-flex items-center gap-2 rounded-lg bg-vue px-4 py-2 font-medium text-vue-foreground hover:opacity-90"
        >
          Start learning <ArrowRightIcon class="size-4" />
        </RouterLink>
        <RouterLink to="/coverage" class="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-medium hover:bg-muted">
          API coverage map
        </RouterLink>
      </div>
      <div class="mt-6 max-w-md">
        <div class="mb-1 flex justify-between text-sm text-muted-foreground">
          <span>Your progress</span><span>{{ progress.percent }}%</span>
        </div>
        <Progress :model-value="progress.percent" />
      </div>
    </section>

    <section class="mb-10 grid gap-4 md:grid-cols-3">
      <div v-for="p in pillars" :key="p.title" class="rounded-xl border p-4">
        <component :is="p.icon" class="mb-2 size-5 text-vue" />
        <h2 class="font-semibold">{{ p.title }}</h2>
        <p class="text-sm text-muted-foreground">{{ p.text }}</p>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card v-for="section in lessonsBySection" :key="section.id" class="gap-3">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <component :is="sectionIcons[section.icon]" class="size-4 text-vue" />
            {{ section.title }}
          </CardTitle>
          <CardDescription>{{ section.lessons.length }} lessons · {{ progress.sectionPercent(section.id) }}% done</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress :model-value="progress.sectionPercent(section.id)" class="mb-3 h-1" />
          <ul class="space-y-1 text-sm">
            <li v-for="lesson in section.lessons" :key="lesson.path">
              <RouterLink :to="lesson.path" class="flex items-center gap-2 hover:text-vue">
                <span :class="['size-1.5 rounded-full', progress.isDone(lesson.path) ? 'bg-vue' : 'bg-muted-foreground/30']" />
                {{ lesson.title }}
              </RouterLink>
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  </div>
</template>
