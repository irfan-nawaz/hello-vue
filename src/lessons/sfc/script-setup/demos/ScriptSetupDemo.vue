<script setup lang="ts">
import { ref } from 'vue'
import GenericSelect from './GenericSelect.vue'
import WithNormalScript from './WithNormalScript.vue'

const size = ref<'s' | 'm' | 'l'>('m')
const sizes = [
  { value: 's' as const, label: 'Small' },
  { value: 'm' as const, label: 'Medium' },
  { value: 'l' as const, label: 'Large' },
]
const level = ref(2)
const levels = [1, 2, 3].map((n) => ({ value: n, label: `Level ${n}` }))
const count = ref(2)
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <span class="label">generic component: T inferred as 's' | 'm' | 'l'</span>
      <GenericSelect v-model="size" :items="sizes" />
      <span class="label">…and as number, with a typed scoped slot</span>
      <GenericSelect v-model="level" :items="levels">
        <template #option="{ item, selected }">{{ selected ? '★' : '' }}{{ item.label }}</template>
      </GenericSelect>
      <p class="mono">size={{ size }} level={{ level }}</p>
    </div>
    <div class="stack">
      <span class="label">normal &lt;script&gt; + &lt;script setup&gt;</span>
      <button @click="count++">add instance</button>
      <WithNormalScript v-for="n in count" :key="n" />
    </div>
  </div>
</template>
