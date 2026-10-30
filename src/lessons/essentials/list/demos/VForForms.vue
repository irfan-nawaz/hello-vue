<script setup lang="ts">
import { reactive, ref } from 'vue'

const items = ref([{ id: 1, text: 'Learn' }, { id: 2, text: 'Build' }])
const book = reactive({ title: 'How to do lists in Vue', author: 'Jane Doe', year: 2016 })
const filter = ref(false)
const nextId = ref(3)
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="stack box">
      <span class="label">array · (item, index)</span>
      <ul><li v-for="(item, index) in items" :key="item.id">{{ index }} — {{ item.text }}</li></ul>
      <div class="row">
        <button @click="items.push({ id: nextId++, text: 'Item ' + nextId })">push</button>
        <button @click="items.reverse()">reverse</button>
        <button @click="items = items.filter((i) => i.id % 2)">filter (replace)</button>
      </div>
    </div>
    <div class="stack box">
      <span class="label">object · (value, key, index)</span>
      <ul><li v-for="(value, key, index) in book" :key="key">{{ index }}. {{ key }}: {{ value }}</li></ul>
      <span class="label">range · n in 5</span>
      <p><span v-for="n in 5" :key="n" class="mr-1 rounded bg-muted px-1.5">{{ n }}</span></p>
    </div>
    <div class="stack box">
      <span class="label">&lt;template v-for&gt; + v-if</span>
      <label class="row text-sm"><input v-model="filter" type="checkbox" /> only odd ids</label>
      <ul>
        <template v-for="item in items" :key="item.id">
          <li v-if="!filter || item.id % 2">#{{ item.id }} {{ item.text }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>
