<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { MoonIcon, SearchIcon, SunIcon } from '@lucide/vue'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Kbd } from '@/components/ui/kbd'
import { Toaster } from '@/components/ui/sonner'
import AppSidebar from '@/components/app/AppSidebar.vue'
import LessonShell from '@/components/app/LessonShell.vue'
import SearchDialog from '@/components/app/SearchDialog.vue'
import 'vue-sonner/style.css'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const searchOpen = ref(false)
</script>

<template>
  <a
    href="#main"
    class="sr-only z-50 rounded-md bg-vue px-3 py-2 text-vue-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
  >
    Skip to content
  </a>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur"
      >
        <SidebarTrigger />
        <button
          class="flex h-8 w-full max-w-sm items-center gap-2 rounded-md border bg-muted/40 px-3 text-sm text-muted-foreground hover:bg-muted"
          @click="searchOpen = true"
        >
          <SearchIcon class="size-4" />
          <span class="mr-auto">Search lessons & APIs…</span>
          <Kbd>⌘K</Kbd>
        </button>
        <button
          class="ml-auto rounded-md p-2 hover:bg-muted"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleDark()"
        >
          <SunIcon v-if="isDark" class="size-4" />
          <MoonIcon v-else class="size-4" />
        </button>
      </header>
      <main id="main" tabindex="-1" class="outline-none">
        <RouterView v-slot="{ Component, route }">
          <LessonShell
            v-if="route.matched[0]?.meta.lesson"
            :key="route.matched[0].path"
            :lesson="route.matched[0].meta.lesson"
          >
            <component :is="Component" />
          </LessonShell>
          <component :is="Component" v-else />
        </RouterView>
      </main>
    </SidebarInset>
    <SearchDialog v-model:open="searchOpen" />
    <Toaster rich-colors />
  </SidebarProvider>
</template>
