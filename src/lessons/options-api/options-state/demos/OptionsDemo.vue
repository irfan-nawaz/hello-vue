<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { EventLog, useEventLog } from '@/kit'
import TodoOptions from './TodoOptions.vue'

const events = useEventLog()
const todoRef = useTemplateRef<InstanceType<typeof TodoOptions>>('todo')
const initial = [
  { id: 1, text: 'Learn data()', done: true },
  { id: 2, text: 'Learn computed', done: false },
]
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <TodoOptions ref="todo" title="Options todos" :initial @change="(n) => events.log(`@change remaining=${n}`, 'event')">
        <template #item="{ todo }"><span :class="{ 'line-through opacity-50': todo.done }">{{ todo.text }}</span></template>
      </TodoOptions>
      <button @click="todoRef?.clearDone()">parent calls exposed clearDone()</button>
    </div>
    <EventLog :log="events" height="10rem" />
  </div>
</template>
