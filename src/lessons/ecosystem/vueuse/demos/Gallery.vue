<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import {
  onClickOutside, useClipboard, useDark, useDebounceFn, useElementSize, useElementVisibility, useEventListener,
  useIdle, useLocalStorage, useMouse, useNow, useOnline, useRefHistory, useThrottleFn,
} from '@vueuse/core'

// sensors
const { x, y } = useMouse()
const online = useOnline()
const { idle } = useIdle(5000)
const now = useNow()

// state
const name = useLocalStorage('vue-lab:vueuse-name', 'Ada') // persisted + synced across tabs
const counter = ref(0)
const { history, undo, redo, canUndo, canRedo } = useRefHistory(counter, { capacity: 10 })
const isDark = useDark()

// timing
const typed = ref('')
const debounced = ref('')
const throttled = ref(0)
const onType = useDebounceFn((v: string) => (debounced.value = v), 500)
const onScroll = useThrottleFn(() => throttled.value++, 300)

// elements
const box = useTemplateRef<HTMLElement>('box')
const { width, height } = useElementSize(box)
const menu = useTemplateRef<HTMLElement>('menu')
const menuOpen = ref(false)
onClickOutside(menu, () => (menuOpen.value = false))
const target = useTemplateRef<HTMLElement>('target')
const visible = useElementVisibility(target)
const keys = ref('')
useEventListener(document, 'keydown', (e) => (keys.value = e.key)) // auto-removed on unmount

// browser
const { copy, copied, isSupported } = useClipboard({ legacy: true })
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <div class="box"><div class="label">useMouse</div><p class="mono">{{ x }}, {{ y }}</p></div>
    <div class="box"><div class="label">useOnline · useIdle(5s) · useNow</div><p class="mono">{{ online ? 'online' : 'offline' }} · {{ idle ? 'idle 😴' : 'active' }} · {{ now.toLocaleTimeString() }}</p></div>
    <div class="box stack"><div class="label">useLocalStorage (reload me)</div><input v-model="name" aria-label="name" /></div>
    <div class="box stack">
      <div class="label">useRefHistory</div>
      <div class="row"><button @click="counter++">{{ counter }}</button><button :disabled="!canUndo" @click="undo()">undo</button><button :disabled="!canRedo" @click="redo()">redo</button></div>
      <p class="mono">{{ history.map((h) => h.snapshot).join(' ← ') }}</p>
    </div>
    <div class="box stack"><div class="label">useDark</div><label class="row text-sm"><input v-model="isDark" type="checkbox" /> dark mode (same as header toggle)</label></div>
    <div class="box stack">
      <div class="label">useDebounceFn (500ms)</div>
      <input v-model="typed" placeholder="type…" @input="onType(typed)" />
      <p class="mono">debounced: {{ debounced }}</p>
    </div>
    <div class="box stack">
      <div class="label">useThrottleFn (300ms)</div>
      <div class="h-16 overflow-y-scroll rounded border" @scroll="onScroll"><p class="h-48 p-1 text-xs">scroll — handler calls: {{ throttled }}</p></div>
    </div>
    <div ref="box" class="box resize overflow-auto"><div class="label">useElementSize (drag corner)</div><p class="mono">{{ Math.round(width) }} × {{ Math.round(height) }}</p></div>
    <div class="box stack">
      <div class="label">onClickOutside</div>
      <div ref="menu" class="relative">
        <button @click="menuOpen = !menuOpen">menu</button>
        <p v-if="menuOpen" class="absolute z-10 mt-1 rounded border bg-background p-2 text-sm shadow">click outside to close</p>
      </div>
    </div>
    <div class="box stack">
      <div class="label">useElementVisibility</div>
      <div class="h-16 overflow-y-scroll rounded border"><div class="h-40" /><p ref="target" class="text-xs">👀 target</p></div>
      <p class="mono">target visible: {{ visible }}</p>
    </div>
    <div class="box"><div class="label">useEventListener</div><p class="mono">last key: {{ keys || '(press a key)' }}</p></div>
    <div class="box stack"><div class="label">useClipboard</div><button :disabled="!isSupported" @click="copy(name)">{{ copied ? 'copied!' : `copy “${name}”` }}</button></div>
  </div>
</template>
