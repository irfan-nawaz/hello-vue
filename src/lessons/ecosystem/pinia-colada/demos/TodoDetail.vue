<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { api } from './fakeApi'

const props = defineProps<{ id: number }>()

// key is a getter → each id gets its own cache entry; switching back is instant if fresh
const { data, isLoading, asyncStatus } = useQuery({
  key: () => ['todos', props.id],
  query: () => api.todo(props.id),
})
</script>

<template>
  <div class="box text-sm">
    <span class="label">detail ['todos', {{ id }}]</span>
    <p v-if="isLoading" class="animate-pulse">loading…</p>
    <p v-else-if="data">{{ data.title }} · {{ data.done ? 'done' : 'open' }} · fetched {{ data.fetchedAt }}
      <span v-if="asyncStatus === 'loading'" class="text-amber-500">(refreshing)</span>
    </p>
  </div>
</template>
