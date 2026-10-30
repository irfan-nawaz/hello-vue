<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { refDebounced } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { apiCoverage, guideCoverage } from '@/lessons/coverage'

const query = ref('')
const q = refDebounced(query, 150)
const onlyMissing = ref(false)

const views = computed(() =>
  [
    { title: 'Guide topics', data: guideCoverage },
    { title: 'API reference + ecosystem', data: apiCoverage },
  ].map(({ title, data }) => {
    const all = data.groups.flatMap((g) => g.items)
    const covered = all.filter((i) => i.lessons.length).length
    return {
      title,
      covered,
      total: all.length,
      unknown: data.unknown,
      groups: data.groups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (i) =>
              i.name.toLowerCase().includes(q.value.toLowerCase()) &&
              (!onlyMissing.value || !i.lessons.length),
          ),
        }))
        .filter((g) => g.items.length),
    }
  }),
)
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10 md:px-8">
    <h1 class="text-3xl font-bold tracking-tight">Coverage map</h1>
    <p class="mt-2 text-muted-foreground">
      Every topic from the Vue guide and every API reference entry, linked to the lesson that teaches it.
    </p>
    <div class="mt-6 flex flex-wrap items-center gap-4">
      <Input v-model="query" placeholder="Filter… (e.g. watch, $, define)" class="max-w-xs" />
      <label class="flex items-center gap-2 text-sm"><Switch v-model="onlyMissing" /> only uncovered</label>
    </div>

    <section v-for="view in views" :key="view.title" class="mt-10">
      <h2 class="mb-1 text-xl font-semibold">
        {{ view.title }}
        <span class="ml-2 text-sm font-normal text-muted-foreground">{{ view.covered }} / {{ view.total }} covered</span>
      </h2>
      <p v-if="view.unknown.length" class="mb-2 text-sm text-red-500">
        Unknown names in lesson metadata: {{ view.unknown.join(', ') }}
      </p>
      <div class="columns-1 gap-4 md:columns-2 xl:columns-3">
        <div v-for="g in view.groups" :key="g.group" class="mb-4 break-inside-avoid rounded-lg border p-3">
          <h3 class="mb-2 text-sm font-semibold">{{ g.group }}</h3>
          <ul class="space-y-1 text-sm">
            <li v-for="item in g.items" :key="item.name" class="flex flex-wrap items-baseline gap-x-2">
              <span :class="['font-mono text-xs', item.lessons.length ? '' : 'text-red-500']">
                {{ item.lessons.length ? '✓' : '✗' }} {{ item.name }}
              </span>
              <RouterLink
                v-for="l in item.lessons"
                :key="l.path"
                :to="l.path"
                class="text-xs text-vue hover:underline"
              >
                {{ l.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
