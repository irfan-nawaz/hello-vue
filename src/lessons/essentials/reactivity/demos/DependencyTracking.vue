<script setup lang="ts">
import { reactive, ref } from 'vue'
import { DepTracker, useDepTracker } from '@/kit'

const count = ref(0)
const unused = ref(0) // never read in the template → never tracked
const user = reactive({ name: 'Ada', address: { city: 'London' }, tags: ['math'] })
const showCity = ref(true)

// Watch Vue's dependency tracking for THIS component's render
const tracker = useDepTracker({ count, unused, user, address: user.address, tags: user.tags, showCity })
</script>

<template>
  <div class="stack">
    <p>
      count: <b>{{ count }}</b> · {{ user.name }}
      <span v-if="showCity">from {{ user.address.city }}</span> · tags: {{ user.tags.join(', ') }}
    </p>
    <div class="row">
      <button @click="count++">count++</button>
      <button @click="unused++">unused++ (no re-render!)</button>
      <button @click="user.address.city = user.address.city === 'London' ? 'Paris' : 'London'">
        change nested city
      </button>
      <button @click="user.tags.push('code')">tags.push()</button>
      <label class="row text-sm"><input v-model="showCity" type="checkbox" /> show city</label>
    </div>
    <DepTracker :tracker />
    <p class="text-xs text-muted-foreground">
      Untick “show city” then change the city: it is no longer tracked, so no re-render happens.
      Dependencies are recollected on every render.
    </p>
  </div>
</template>
