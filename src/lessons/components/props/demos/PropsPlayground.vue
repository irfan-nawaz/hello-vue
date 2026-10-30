<script setup lang="ts">
import { ref, watch } from 'vue'
import UserCard from './UserCard.vue'
import RuntimeProps from './RuntimeProps.vue'
import { EventLog, useEventLog } from '@/kit'

const name = ref('Ada Lovelace')
const age = ref<number>()
const rating = ref(3)
const events = useEventLog()

// warnHandler is app-wide; here we just tell you where to look
watch(rating, (r) => (r < 1 || r > 5) && events.log(`rating=${r} fails the validator → see the console warning`, 'warn'))
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <input v-model="name" aria-label="name" />
      <label class="row text-sm">age <input v-model.number="age" type="number" placeholder="(default 18)" class="w-28" /></label>
      <UserCard :name :age verified />
      <UserCard name="Grace Hopper" role="admin" :tags="['navy', 'cobol']" />
    </div>
    <div class="stack">
      <label class="row text-sm">rating {{ rating }} <input v-model.number="rating" type="range" min="0" max="7" /></label>
      <RuntimeProps :book="{ title: 'SICP', year: 1985 }" :rating />
      <EventLog :log="events" height="6rem" />
    </div>
  </div>
</template>
