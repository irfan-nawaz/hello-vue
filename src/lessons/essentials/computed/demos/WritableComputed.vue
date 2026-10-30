<script setup lang="ts">
import { computed, ref } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// get + set: writing to fullName splits it back into its sources
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (v: string) => {
    ;[firstName.value = '', lastName.value = ''] = v.split(' ')
  },
})

// 3.4+: the getter receives the previous value
const nonDecreasing = ref(0)
const highWater = computed<number>((previous) =>
  previous !== undefined && nonDecreasing.value < previous ? previous : nonDecreasing.value,
)
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <label class="stack text-sm">fullName (v-model on a computed!) <input v-model="fullName" /></label>
      <p class="mono">firstName = "{{ firstName }}" · lastName = "{{ lastName }}"</p>
    </div>
    <div class="stack">
      <label class="stack text-sm">value: {{ nonDecreasing }} <input v-model.number="nonDecreasing" type="range" min="0" max="100" /></label>
      <p class="mono">highest seen (previous-value computed): {{ highWater }}</p>
    </div>
  </div>
</template>
