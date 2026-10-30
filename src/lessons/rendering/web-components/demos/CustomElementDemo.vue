<script setup lang="ts">
import { ref } from 'vue'
import { EventLog, useEventLog } from '@/kit'
import { registerLabElements } from './register'

registerLabElements()
const events = useEventLog()
const label = ref('clicks')
const tz = ref('Asia/Kolkata')
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <input v-model="label" aria-label="label prop" />
      <!-- vite.config.ts: isCustomElement(tag => tag.startsWith('lab-')) so Vue treats it as native -->
      <lab-counter :label :start="5" @changed="(e: CustomEvent<number[]>) => events.log(`CustomEvent 'changed' detail=${JSON.stringify(e.detail)}`, 'event')">
        <em>slotted light-DOM content</em>
      </lab-counter>
      <select v-model="tz" aria-label="time zone"><option>Asia/Kolkata</option><option>Europe/Paris</option><option>America/New_York</option></select>
      <lab-time :tz />
    </div>
    <EventLog :log="events" height="10rem" />
  </div>
</template>
