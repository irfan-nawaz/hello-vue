<script setup lang="ts">
import { ref } from 'vue'

let id = 9
const items = ref(Array.from({ length: 8 }, (_, i) => i + 1))
const insert = () => items.value.splice(Math.floor(Math.random() * (items.value.length + 1)), 0, id++)
const remove = () => items.value.splice(Math.floor(Math.random() * items.value.length), 1)
const shuffle = () => (items.value = [...items.value].sort(() => Math.random() - 0.5))
const sort = () => (items.value = [...items.value].sort((a, b) => a - b))
</script>

<template>
  <div class="stack">
    <div class="row">
      <button @click="insert">insert at random</button>
      <button @click="remove">remove at random</button>
      <button @click="shuffle">shuffle</button>
      <button @click="sort">sort</button>
    </div>
    <!-- renders a real <ul>; every child needs a key -->
    <TransitionGroup name="list" tag="ul" class="relative flex flex-wrap gap-2">
      <li v-for="item in items" :key="item" class="grid size-12 place-items-center rounded-lg bg-vue font-bold text-white">
        {{ item }}
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-move, /* the move class: applied while items slide to their new position */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-20px);
}
/* take leaving items out of the flow so siblings can move smoothly */
.list-leave-active {
  position: absolute;
}
</style>
