<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useMutation, useQuery, useQueryCache } from '@pinia/colada'
import { useIntervalFn } from '@vueuse/core'
import { api, server } from './fakeApi'
import TodoDetail from './TodoDetail.vue'

const queryCache = useQueryCache()
const staleTime = ref(5000)

// useQuery: cached by key, deduped, refetched when stale & a component needs it
const todos = useQuery({
  key: ['todos'],
  query: api.todos,
  staleTime: staleTime.value,
})

// useMutation: run a write, then invalidate affected queries so they refetch
const addTodo = useMutation({
  mutation: (title: string) => api.add(title),
  onSettled: () => queryCache.invalidateQueries({ key: ['todos'] }),
})
const toggle = useMutation({
  mutation: (id: number) => api.toggle(id),
  // optimistic update: change the cache immediately, roll back on error
  onMutate(id) {
    const previous = queryCache.getQueryData<typeof todos.data.value>(['todos'])
    queryCache.setQueryData(['todos'], previous?.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
    return { previous }
  },
  onError: (_e, _id, ctx) => queryCache.setQueryData(['todos'], ctx?.previous),
  onSettled: () => queryCache.invalidateQueries({ key: ['todos'] }),
})

const draft = ref('')
const selected = ref<number>()

// cache inspector: snapshot every entry a few times per second
const entries = shallowRef<{ key: string; status: string; async: string; age: string; consumers: number }[]>([])
useIntervalFn(() => {
  entries.value = queryCache.getEntries().map((e) => ({
    key: JSON.stringify(e.key),
    status: e.state.value.status,
    async: e.asyncStatus.value,
    age: e.when ? `${((Date.now() - e.when) / 1000).toFixed(1)}s` : 'invalidated',
    consumers: e.deps.size,
  }))
}, 250)
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack text-sm">
      <div class="row">
        <label class="row">latency {{ server.latency }}ms <input v-model.number="server.latency" type="range" min="0" max="3000" step="100" /></label>
        <label class="row">fail {{ Math.round(server.failRate * 100) }}% <input v-model.number="server.failRate" type="range" min="0" max="1" step="0.1" /></label>
      </div>
      <div class="row">
        <button @click="todos.refetch()">refetch()</button>
        <button @click="todos.refresh()">refresh() (only if stale)</button>
        <button @click="queryCache.invalidateQueries({ key: ['todos'] })">invalidate ['todos']</button>
        <span class="mono">server calls: {{ server.calls }}</span>
      </div>
      <p v-if="todos.error.value" class="text-red-500">{{ todos.error.value.message }}</p>
      <p v-if="todos.isLoading.value" class="animate-pulse">first load…</p>
      <ul class="stack">
        <li v-for="t in todos.data.value" :key="t.id" class="row">
          <input type="checkbox" :checked="t.done" :aria-label="t.title" @change="toggle.mutate(t.id)" />
          <button class="border-0! px-1!" @click="selected = t.id">{{ t.title }}</button>
        </li>
      </ul>
      <form class="row" @submit.prevent="addTodo.mutate(draft), (draft = '')">
        <input v-model="draft" placeholder="new todo" />
        <button :disabled="addTodo.asyncStatus.value === 'loading'">{{ addTodo.asyncStatus.value === 'loading' ? 'adding…' : 'add' }}</button>
      </form>
      <TodoDetail v-if="selected" :id="selected" />
    </div>
    <div class="box">
      <div class="label mb-2">query cache (live)</div>
      <table class="w-full text-xs">
        <thead><tr><th>key</th><th>status</th><th>async</th><th>age</th><th>users</th></tr></thead>
        <tbody>
          <tr v-for="e in entries" :key="e.key">
            <td class="mono">{{ e.key }}</td>
            <td :class="{ 'text-vue': e.status === 'success', 'text-red-500': e.status === 'error' }">{{ e.status }}</td>
            <td :class="{ 'text-amber-500': e.async === 'loading' }">{{ e.async }}</td>
            <td class="mono">{{ e.age }}</td>
            <td>{{ e.consumers }}</td>
          </tr>
        </tbody>
      </table>
      <p class="mt-2 text-xs text-muted-foreground">
        Click a todo → a new ['todos', id] entry. Switch away and back within 5s (global staleTime in main.ts) → no refetch.
        Re-mount the demo → cached data shows instantly while it revalidates.
      </p>
    </div>
  </div>
</template>
