<script setup lang="ts">
import { getCurrentInstance, onMounted, onUpdated, ref, type VNode } from 'vue'

const emit = defineEmits<{ rendered: [tree: VNode] }>()
const count = ref(0)
const items = ref(['a', 'b'])
const instance = getCurrentInstance()!
// subTree = the vnode tree this component's render function produced
const report = () => emit('rendered', instance.subTree)
onMounted(report)
onUpdated(report)
</script>

<template>
  <div class="box">
    <h4>Static title</h4>
    <p>count: {{ count }}</p>
    <ul>
      <li v-for="i in items" :key="i">{{ i }}</li>
    </ul>
    <button @click="count++">count++</button>
    <button @click="items.push(String.fromCharCode(97 + items.length))">push</button>
  </div>
</template>
