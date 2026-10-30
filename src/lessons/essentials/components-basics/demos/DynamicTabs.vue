<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const Home = { template: '<p>🏠 Home tab — type here: <input /></p>' }
const Posts = { template: '<p>📝 Posts tab</p>' }
const Archive = { template: '<p>🗄️ Archive tab</p>' }
const tabs = { Home, Posts, Archive }
type Tab = keyof typeof tabs

const current = ref<Tab>('Home')
const keep = ref(false)
// shallowRef: component definitions should not be made deeply reactive
const component = shallowRef(tabs.Home)
const select = (t: Tab) => {
  current.value = t
  component.value = tabs[t]
}
</script>

<template>
  <div class="stack">
    <div class="row">
      <button v-for="(_, t) in tabs" :key="t" :class="{ 'ring-2 ring-vue': current === t }" @click="select(t)">{{ t }}</button>
      <label class="row text-sm"><input v-model="keep" type="checkbox" /> wrap in &lt;KeepAlive&gt;</label>
    </div>
    <div class="box">
      <KeepAlive v-if="keep"><component :is="component" /></KeepAlive>
      <component :is="component" v-else />
    </div>
  </div>
</template>
