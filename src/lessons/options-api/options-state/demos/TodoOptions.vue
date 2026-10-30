<script lang="ts">
import { defineComponent, type PropType, type SlotsType } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

// defineComponent() gives full type inference for `this` in the Options API
export default defineComponent({
  props: {
    title: { type: String, required: true },
    initial: { type: Array as PropType<Todo[]>, default: () => [] },
  },
  emits: {
    change: (remaining: number) => remaining >= 0,
  },
  // slots option: type-only declaration of slots (3.3+)
  slots: Object as SlotsType<{ item: { todo: Todo } }>,
  // expose: only these are visible to a parent's template ref.
  // (spread in untyped: vue-tsc currently narrows this component's own template types to `expose`)
  ...({ expose: ['clearDone'] } as object),
  data() {
    // returned object is made deeply reactive; props are accessible on `this`
    return { todos: [...this.initial] as Todo[], draft: '', nextId: 100 }
  },
  computed: {
    remaining(): number {
      return this.todos.filter((t) => !t.done).length
    },
    // writable computed
    allDone: {
      get(): boolean {
        return this.todos.length > 0 && this.remaining === 0
      },
      set(v: boolean) {
        this.todos.forEach((t) => (t.done = v))
      },
    },
  },
  watch: {
    remaining(now: number) {
      this.$emit('change', now)
    },
    // deep watcher via object syntax
    todos: { handler() { localStorage.setItem('lab:options-todos', JSON.stringify(this.todos)) }, deep: true },
  },
  methods: {
    add() {
      if (!this.draft.trim()) return
      this.todos.push({ id: this.nextId++, text: this.draft, done: false })
      this.draft = ''
    },
    clearDone() {
      this.todos = this.todos.filter((t) => !t.done)
    },
  },
})
</script>

<template>
  <div class="box stack">
    <h4 class="font-semibold">{{ title }} — {{ remaining }} left</h4>
    <label class="row text-sm"><input v-model="allDone" type="checkbox" /> all done (writable computed)</label>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="row">
        <input v-model="todo.done" type="checkbox" :aria-label="todo.text" />
        <slot name="item" :todo>{{ todo.text }}</slot>
      </li>
    </ul>
    <form class="row" @submit.prevent="add"><input v-model="draft" placeholder="new todo" /><button>add</button></form>
  </div>
</template>
