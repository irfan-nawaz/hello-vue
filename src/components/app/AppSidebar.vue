<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { CheckIcon, ListChecksIcon } from '@lucide/vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Progress } from '@/components/ui/progress'
import { lessonsBySection } from '@/lessons/registry'
import { useProgressStore } from '@/stores/progress'
import { sectionIcons } from './sectionIcons'

const route = useRoute()
const progress = useProgressStore()
</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <RouterLink to="/" class="flex items-center gap-2 px-2 py-1.5">
        <span class="grid size-8 place-items-center rounded-lg bg-vue font-bold text-vue-foreground">V</span>
        <span class="leading-tight">
          <span class="block font-semibold">Vue Lab</span>
          <span class="block text-xs text-muted-foreground">learn by poking it</span>
        </span>
      </RouterLink>
      <div class="px-2 pt-1">
        <div class="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>Progress</span><span>{{ progress.percent }}%</span>
        </div>
        <Progress :model-value="progress.percent" class="h-1.5" />
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup v-for="section in lessonsBySection" :key="section.id">
        <SidebarGroupLabel class="gap-2">
          <component :is="sectionIcons[section.icon]" class="size-3.5" />
          {{ section.title }}
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem v-for="lesson in section.lessons" :key="lesson.path">
            <SidebarMenuButton as-child size="sm" :is-active="route.matched[0]?.path === lesson.path">
              <RouterLink :to="lesson.path">
                <span class="truncate">{{ lesson.title }}</span>
                <CheckIcon v-if="progress.isDone(lesson.path)" class="ml-auto text-vue" />
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child :is-active="route.name === 'coverage'">
            <RouterLink to="/coverage"><ListChecksIcon /> API coverage map</RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
