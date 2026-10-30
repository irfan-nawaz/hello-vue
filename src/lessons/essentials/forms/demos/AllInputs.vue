<script setup lang="ts">
import { reactive } from 'vue'
import { StateInspector } from '@/kit'

const form = reactive({
  text: 'hello',
  multiline: 'line 1\nline 2',
  checked: true,
  toggle: 'yes', // custom true-value / false-value
  frameworks: ['vue'] as string[],
  picked: 'one',
  selected: 'B',
  multiSelected: [] as string[],
  objectSelected: null as null | { code: string },
  lazy: '',
  age: 0,
  trimmed: '',
  range: 50,
  color: '#42b883',
  date: '',
})
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack text-sm">
      <input v-model="form.text" aria-label="text" />
      <textarea v-model="form.multiline" rows="2" aria-label="multiline" />
      <label class="row"><input v-model="form.checked" type="checkbox" /> single checkbox → boolean</label>
      <label class="row"><input v-model="form.toggle" type="checkbox" true-value="yes" false-value="no" /> true-value / false-value</label>
      <div class="row">
        <label v-for="f in ['vue', 'react', 'svelte']" :key="f" class="row"><input v-model="form.frameworks" type="checkbox" :value="f" /> {{ f }}</label>
        <span class="text-muted-foreground">→ array</span>
      </div>
      <div class="row">
        <label class="row"><input v-model="form.picked" type="radio" value="one" /> one</label>
        <label class="row"><input v-model="form.picked" type="radio" value="two" /> two</label>
      </div>
      <div class="row">
        <select v-model="form.selected" aria-label="single select">
          <option disabled value="">Please select one</option><option>A</option><option>B</option><option>C</option>
        </select>
        <select v-model="form.multiSelected" multiple class="h-16!" aria-label="multi select"><option>X</option><option>Y</option><option>Z</option></select>
        <select v-model="form.objectSelected" aria-label="object select">
          <option :value="null">no object</option>
          <option :value="{ code: 'NL' }">object value</option>
        </select>
      </div>
      <input v-model.lazy="form.lazy" placeholder=".lazy — syncs on change, not input" />
      <input v-model.number="form.age" placeholder=".number" />
      <input v-model.trim="form.trimmed" placeholder=".trim — try leading spaces" />
      <div class="row">
        <input v-model.number="form.range" type="range" aria-label="range" />
        <input v-model="form.color" type="color" class="w-12 p-0" aria-label="color" />
        <input v-model="form.date" type="date" aria-label="date" />
      </div>
    </div>
    <StateInspector :value="form" label="form model (note the types)" />
  </div>
</template>
