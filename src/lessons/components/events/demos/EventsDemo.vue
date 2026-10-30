<script setup lang="ts">
import { EventLog, useEventLog } from '@/kit'
import SearchBox from './SearchBox.vue'
import ValidatedEmit from './ValidatedEmit.vue'

const events = useEventLog()
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <!-- listen with @kebab-case or @camelCase -->
      <SearchBox
        @search="(q, opts) => events.log(`@search`, 'event', { q, ...opts })"
        @clear="events.log('@clear', 'event')"
      />
      <!-- .once works on component events too -->
      <ValidatedEmit @submit.once="(p) => events.log('@submit.once', 'event', p)" />
    </div>
    <EventLog :log="events" height="10rem" />
  </div>
</template>
