<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, useTemplateRef } from 'vue'

const books = ref(['Vue 3 Guide', 'Reactivity in Depth'])
const unrelated = ref(0)

// Plain (non-reactive) counters: making them reactive would make
// every render trigger another render
const runs = { computed: 0, method: 0 }

// Cached: only re-evaluates when `books` changes
const hasBooks = computed(() => {
  // oxlint-disable-next-line vue/no-side-effects-in-computed-properties -- counting runs is the point of this demo
  runs.computed++
  return books.value.length > 0 ? 'Yes' : 'No'
})

// Method: runs on EVERY render of this component, whatever changed
function hasBooksMethod() {
  runs.method++
  return books.value.length > 0 ? 'Yes' : 'No'
}

const computedEl = useTemplateRef<HTMLElement>('computedEl')
const methodEl = useTemplateRef<HTMLElement>('methodEl')
const paint = () => {
  computedEl.value!.textContent = String(runs.computed)
  methodEl.value!.textContent = String(runs.method)
}
onMounted(paint)
onUpdated(paint)
</script>

<template>
  <div class="stack">
    <p>
      Has books? computed: <b>{{ hasBooks }}</b> {{ hasBooks }} {{ hasBooks }} · method:
      <b>{{ hasBooksMethod() }}</b> {{ hasBooksMethod() }} {{ hasBooksMethod() }}
    </p>
    <div class="row">
      <button @click="books.push('New book')">add book</button>
      <button @click="books = []">clear books</button>
      <button @click="unrelated++">unrelated++ ({{ unrelated }})</button>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="box text-center">
        <div class="label">computed getter ran</div>
        <div ref="computedEl" class="text-2xl font-bold text-vue" />
      </div>
      <div class="box text-center">
        <div class="label">method ran</div>
        <div ref="methodEl" class="text-2xl font-bold text-red-500" />
      </div>
    </div>
  </div>
</template>
