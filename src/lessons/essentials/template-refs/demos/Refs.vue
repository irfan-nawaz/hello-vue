<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import Stopwatch from './Stopwatch.vue'

// 3.5+: useTemplateRef('key') matches ref="key" in the template
const input = useTemplateRef<HTMLInputElement>('my-input')
onMounted(() => input.value?.focus()) // only available after mount

// refs inside v-for collect into an array (order not guaranteed)
const items = ref(['a', 'b', 'c'])
// the key must not match a setup binding name (`items`), or Vue would assign the elements to it
const itemEls = useTemplateRef<HTMLLIElement[]>('item-els')

// function ref: called with the element on mount/update and null on unmount
const widths = ref<Record<string, number>>({})
const measure = (el: unknown, key: string) => {
  if (el instanceof HTMLElement) widths.value[key] = el.offsetWidth
}

// component ref → the instance's exposed API
const stopwatch = useTemplateRef<InstanceType<typeof Stopwatch>>('stopwatch')
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="stack box">
      <span class="label">element ref</span>
      <input ref="my-input" placeholder="auto-focused on mount" />
      <button @click="input?.select()">input.value.select()</button>
    </div>
    <div class="stack box">
      <span class="label">refs in v-for + function refs</span>
      <ul>
        <li v-for="i in items" ref="item-els" :key="i" class="mr-2 inline-block">
          <span :ref="(el) => measure(el, i)" class="rounded bg-muted px-2">{{ i.repeat(3) }}</span>
        </li>
      </ul>
      <button @click="items.push(String.fromCharCode(97 + items.length))">add</button>
      <p class="mono">itemEls.length: {{ itemEls?.length }}</p>
      <p class="mono">widths: {{ widths }}</p>
    </div>
    <div class="stack box">
      <span class="label">component ref + defineExpose</span>
      <Stopwatch ref="stopwatch" />
      <div class="row">
        <button @click="stopwatch?.start()">start()</button>
        <button @click="stopwatch?.stop()">stop()</button>
        <button @click="stopwatch?.reset()">reset()</button>
      </div>
    </div>
  </div>
</template>
