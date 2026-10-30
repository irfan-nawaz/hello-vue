<script setup lang="ts">
import { defineComponent, h, ref, resolveDirective, withDirectives, type Directive } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const events = useEventLog()

// In <script setup>, any camelCase variable starting with `v` is a directive: vFocus → v-focus
const vFocus: Directive<HTMLInputElement> = { mounted: (el) => el.focus() }

// A directive that logs every hook and shows its binding object
const vSpy: Directive<HTMLElement, string> = {
  created: (_el, b) => events.log(`created  value=${b.value}`, 'hook'),
  beforeMount: () => events.log('beforeMount', 'hook'),
  mounted: (_el, b) => events.log(`mounted  arg=${b.arg} modifiers=${JSON.stringify(b.modifiers)}`, 'success'),
  beforeUpdate: (_el, b) => events.log(`beforeUpdate  ${b.oldValue} → ${b.value}`, 'hook'),
  updated: (el, b) => {
    el.style.background = b.value
    events.log('updated', 'effect')
  },
  beforeUnmount: () => events.log('beforeUnmount', 'warn'),
  unmounted: () => events.log('unmounted', 'error'),
}

// function shorthand = same behaviour for mounted + updated
const vColor = (el: HTMLElement, binding: { value: string; arg?: string }) => {
  el.style[binding.arg === 'bg' ? 'backgroundColor' : 'color'] = binding.value
}

const color = ref('#42b883')
const show = ref(true)

// Render-function usage: withDirectives(vnode, [[directive, value, arg, modifiers]])
const RenderFnDirective = defineComponent({
  directives: { color: vColor }, // Options-style local registration
  setup() {
    const dir = resolveDirective('color')! // look up a registered directive by name
    return () => withDirectives(h('p', 'colored via withDirectives()'), [[dir, color.value]])
  },
})
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <input v-focus placeholder="v-focus: I'm focused on mount" />
      <div class="row">
        <input v-model="color" type="color" class="w-12 p-0" aria-label="color" />
        <label class="row text-sm"><input v-model="show" type="checkbox" /> mounted</label>
      </div>
      <p v-if="show" v-spy:demo.once.fast="color" class="rounded p-2">v-spy:demo.once.fast="color"</p>
      <p v-color="color">v-color (function shorthand)</p>
      <p v-color:bg="color" class="rounded p-1 text-white">v-color:bg (argument)</p>
      <RenderFnDirective />
    </div>
    <EventLog :log="events" height="18rem" title="v-spy hooks" />
  </div>
</template>
