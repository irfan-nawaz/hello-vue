<script setup lang="ts">
import { ref } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const on = ref(true)
const mode = ref<'out-in' | 'in-out' | 'default'>('out-in')
const events = useEventLog()

// JavaScript hooks: call done() to signal the end when using :css="false"
function onEnter(el: Element, done: () => void) {
  events.log('@enter (JS animation via Web Animations API)', 'success')
  el.animate([{ transform: 'rotate(-90deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 400 }).onfinish = done
}
function onLeave(el: Element, done: () => void) {
  events.log('@leave', 'warn')
  el.animate([{ opacity: 1 }, { transform: 'rotate(90deg)', opacity: 0 }], { duration: 400 }).onfinish = done
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <div class="row">
        <select v-model="mode" aria-label="mode"><option>out-in</option><option>in-out</option><option>default</option></select>
        <button @click="on = !on">switch</button>
      </div>
      <div class="box flex h-16 items-center gap-2">
        <Transition
          :mode="mode === 'default' ? undefined : mode"
          :css="false"
          appear
          @before-enter="events.log('@before-enter', 'hook')"
          @enter="onEnter"
          @after-enter="events.log('@after-enter', 'hook')"
          @leave="onLeave"
          @after-leave="events.log('@after-leave', 'hook')"
        >
          <button v-if="on" key="on" class="bg-vue! text-white">ON</button>
          <button v-else key="off">OFF</button>
        </Transition>
      </div>
      <p class="text-xs text-muted-foreground">
        default: both animate simultaneously · out-in: old leaves first · in-out: new enters first. <code>appear</code> animates on initial render.
      </p>
    </div>
    <EventLog :log="events" height="10rem" />
  </div>
</template>
