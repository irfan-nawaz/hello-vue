<script setup lang="ts">
import { computed, ref } from 'vue'

const all = ['Bruce Lee', 'Jackie Chan', 'Chuck Norris', 'Jet Li', 'Kung Fury', 'Donnie Yen', 'Michelle Yeoh']
const query = ref('')
const list = computed(() => all.filter((n) => n.toLowerCase().includes(query.value.toLowerCase())))

// stagger: delay each item by its index (passed via a data- attribute)
function onEnter(el: Element, done: () => void) {
  const i = Number((el as HTMLElement).dataset.index)
  el.animate([{ opacity: 0, height: '0px' }, { opacity: 1, height: '1.6em' }], { duration: 300, delay: i * 80, fill: 'both' }).onfinish = done
}
function onLeave(el: Element, done: () => void) {
  const i = Number((el as HTMLElement).dataset.index)
  el.animate([{ opacity: 1, height: '1.6em' }, { opacity: 0, height: '0px' }], { duration: 300, delay: i * 80, fill: 'both' }).onfinish = done
}
</script>

<template>
  <div class="stack">
    <input v-model="query" placeholder="filter names…" />
    <TransitionGroup tag="ul" :css="false" @enter="onEnter" @leave="onLeave">
      <li v-for="(name, index) in list" :key="name" :data-index="index" class="overflow-hidden">{{ name }}</li>
    </TransitionGroup>
  </div>
</template>
