<script setup lang="ts">
import { ref, shallowRef, triggerRef } from 'vue'
import { useRenderCount } from '@/kit'

const size = 2000
const list = shallowRef(Array.from({ length: size }, (_, i) => ({ id: i, label: `item ${i}` })))
const selected = ref(0)
const memo = ref(true)
const lastPatch = ref('')
useRenderCount('renders')

function select(id: number) {
  const t = performance.now()
  selected.value = id
  requestAnimationFrame(() => (lastPatch.value = `${(performance.now() - t).toFixed(1)}ms to frame`))
}
function relabel() {
  list.value.forEach((i) => (i.label = `item ${i.id} ✎`))
  triggerRef(list) // shallowRef: 2000 objects without deep proxies; notify manually
}
</script>

<template>
  <div class="stack">
    <div class="row">
      <label class="row text-sm"><input v-model="memo" type="checkbox" /> v-memo="[item.id === selected]"</label>
      <button @click="select(Math.floor(Math.random() * size))">select random</button>
      <button @click="relabel">relabel all (triggerRef)</button>
      <span class="mono">{{ lastPatch }}</span>
      <span ref="renders" class="mono rounded px-1" />
    </div>
    <p v-once class="text-xs text-muted-foreground">v-once: rendered once at {{ new Date().toLocaleTimeString() }} — never updated again.</p>
    <div class="h-48 overflow-y-auto rounded border text-xs">
      <template v-if="memo">
        <!-- v-memo: skip re-rendering (and diffing) this subtree unless the deps array changes -->
        <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]" :class="{ 'bg-vue text-white': item.id === selected }" class="px-2" @click="select(item.id)">
          {{ item.label }}
        </div>
      </template>
      <template v-else>
        <div v-for="item in list" :key="item.id" :class="{ 'bg-vue text-white': item.id === selected }" class="px-2" @click="select(item.id)">
          {{ item.label }}
        </div>
      </template>
    </div>
    <p class="text-xs text-muted-foreground">Note: with v-memo on, “relabel all” doesn't show — the memo deps didn't change! That's the trade-off.</p>
  </div>
</template>
