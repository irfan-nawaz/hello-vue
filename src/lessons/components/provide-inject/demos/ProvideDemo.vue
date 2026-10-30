<script setup lang="ts">
import { defineComponent, h, hasInjectionContext, inject, provide, readonly, ref } from 'vue'
import { themeKey } from './keys'
import DeepChild from './DeepChild.vue'

const color = ref('#42b883')
// provide reactive state read-only + a mutation function: keeps changes in the provider
provide(themeKey, { color: readonly(color), setColor: (c) => (color.value = c) })
provide('user', 'Ada')

// middle components know nothing about the theme — no prop drilling
const Middle = defineComponent({
  setup: (_, { slots }) => () => h('div', { class: 'box stack' }, [h('i', 'Middle (no props)'), slots.default?.()]),
})

// hasInjectionContext(): can inject() be called here? (true in setup, false in a click handler)
const inSetup = hasInjectionContext()
const check = ref<boolean>()
// a composable can use it to fall back gracefully
function useUser() {
  return hasInjectionContext() ? inject('user', 'anon') : 'anon (no context)'
}
const userFromComposable = useUser()
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <label class="row text-sm">provider color <input v-model="color" type="color" class="w-12 p-0" /></label>
      <Middle><Middle><DeepChild /></Middle></Middle>
    </div>
    <div class="stack text-sm">
      <p class="mono">hasInjectionContext() during setup: {{ inSetup }}</p>
      <div class="row"><button @click="check = hasInjectionContext()">call it in a click handler</button> <span class="mono">{{ check }}</span></div>
      <p class="mono">useUser() → {{ userFromComposable }}</p>
      <p class="text-muted-foreground">
        App-level: <code>app.provide(key, value)</code> makes a value injectable in every component (plugins use this) —
        see Creating an Application.
      </p>
    </div>
  </div>
</template>
