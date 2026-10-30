<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMagicKeys, whenever } from '@vueuse/core'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { lessonsBySection } from '@/lessons/registry'

const open = defineModel<boolean>('open', { default: false })
const router = useRouter()

const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey) && e.type === 'keydown') e.preventDefault()
  },
})
whenever(() => keys['Meta+K']?.value || keys['Ctrl+K']?.value, () => (open.value = !open.value))

// Each lesson is searchable by its title, summary and every API it covers
const groups = computed(() =>
  lessonsBySection.map((s) => ({
    ...s,
    items: s.lessons.map((l) => ({
      lesson: l,
      search: [l.title, l.summary, ...(l.apis ?? []), ...(l.guide ?? [])].join(' '),
    })),
  })),
)

function go(path: string) {
  open.value = false
  router.push(path)
}
</script>

<template>
  <CommandDialog v-model:open="open" title="Search lessons" description="Search by concept or API">
    <CommandInput placeholder="Search lessons & APIs… (e.g. watchEffect, v-memo, Teleport)" />
    <CommandList>
      <CommandEmpty>No lesson covers that yet.</CommandEmpty>
      <CommandGroup v-for="g in groups" :key="g.id" :heading="g.title">
        <CommandItem
          v-for="{ lesson, search } in g.items"
          :key="lesson.path"
          :value="search"
          @select="go(lesson.path)"
        >
          <div class="min-w-0">
            <div class="font-medium">{{ lesson.title }}</div>
            <div class="truncate text-xs text-muted-foreground">
              {{ lesson.apis?.slice(0, 6).join(' · ') }}
            </div>
          </div>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
