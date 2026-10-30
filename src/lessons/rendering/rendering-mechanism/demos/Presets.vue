<script setup lang="ts">
import { ref } from 'vue'
import { CompileExplorer } from '@/kit'

const presets = {
  'patch flags': `<div :class="cls">class only</div>
<div :style="s">style only</div>
<input :value="v" :placeholder="p" />
<p>{{ text }}</p>
<div v-bind="attrs">full props</div>`,
  'static caching': `<div>
  <h1>Totally static</h1>
  <p class="intro">Never diffed again</p>
  <span>{{ dynamic }}</span>
</div>`,
  'block tree': `<div>
  <header><h1>static</h1></header>
  <section>
    <div><p>{{ deep }}</p></div>
  </section>
  <ul>
    <li v-for="i in list" :key="i">{{ i }}</li>
  </ul>
  <p v-if="ok">conditional block</p>
</div>`,
  'event caching': `<button @click="count++">inline handler</button>
<button @click="onClick">method handler</button>`,
  'v-once / v-memo': `<p v-once>{{ expensive }}</p>
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  {{ item.label }}
</div>`,
}
const preset = ref<keyof typeof presets>('patch flags')
</script>

<template>
  <div class="stack">
    <div class="row">
      <button v-for="(_, name) in presets" :key="name" :class="{ 'ring-2 ring-vue': preset === name }" @click="preset = name">{{ name }}</button>
    </div>
    <CompileExplorer :key="preset" :template="presets[preset]" height="14rem" />
  </div>
</template>
