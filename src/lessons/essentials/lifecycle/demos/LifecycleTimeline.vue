<script setup lang="ts">
import { onErrorCaptured, provide, ref } from 'vue'
import { EventLog, useEventLog, useLifecycleLogger } from '@/kit'
import LifecycleChild from './LifecycleChild.vue'
import Buggy from './Buggy.vue'

const events = useEventLog()
provide('log', events)

const show = ref(true)
const parentValue = ref(0)
const childValue = ref(0)

const Parent = {
  components: { LifecycleChild },
  props: { a: Number, b: Number },
  setup() {
    useLifecycleLogger('Parent', events)
  },
  template: `<div class="row box"><b>Parent {{ a }}</b><LifecycleChild name="Child A" :value="b" /><LifecycleChild name="Child B" :value="0" /></div>`,
}

// onErrorCaptured: catch errors from any descendant; return false to stop propagation
const caught = ref('')
onErrorCaptured((err, _instance, info) => {
  events.log(`onErrorCaptured: ${(err as Error).message} (${info})`, 'error')
  caught.value = (err as Error).message
  return false
})
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <div class="row">
        <button @click="show = !show">{{ show ? 'unmount' : 'mount' }} tree</button>
        <button @click="parentValue++">update Parent only</button>
        <button @click="childValue++">update Child A prop</button>
      </div>
      <component :is="Parent" v-if="show" :a="parentValue" :b="childValue" />
      <div class="box stack">
        <span class="label">onErrorCaptured</span>
        <Buggy v-if="!caught" />
        <p v-else class="text-sm text-red-500">Caught: {{ caught }} <button @click="caught = ''">reset</button></p>
      </div>
    </div>
    <EventLog :log="events" height="22rem" title="hook order" />
  </div>
</template>
