<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const events = useEventLog()
const log = events.log

const Child = defineComponent({
  props: { n: Number },
  data: () => ({ local: 0 }),
  beforeCreate() {
    log('beforeCreate — props resolved, no data/computed yet', 'hook')
  },
  created() {
    log(`created — data ready (local=${this.local}), no DOM ($el=${this.$el})`, 'hook')
  },
  beforeMount() { log('beforeMount', 'hook') },
  mounted() { log(`mounted — $el is <${(this.$el as HTMLElement).tagName.toLowerCase()}>`, 'success') },
  beforeUpdate() { log('beforeUpdate', 'hook') },
  updated() { log('updated', 'effect') },
  beforeUnmount() { log('beforeUnmount', 'warn') },
  unmounted() { log('unmounted', 'error') },
  activated() { log('activated (KeepAlive)', 'success') },
  deactivated() { log('deactivated (KeepAlive)', 'warn') },
  // dev-only debugging hooks
  renderTracked(e) { log(`renderTracked: ${String(e.key)}`, 'info') },
  renderTriggered(e) { log(`renderTriggered: ${String(e.key)} ${e.type}`, 'warn') },
  // serverPrefetch() { return fetchData() }  ← SSR only, see the SSR lesson
  template: `<div class="box row">Child n={{ n }} local={{ local }} <button @click="local++">local++</button></div>`,
})

const Thrower = defineComponent({ render: () => { throw new Error('render error in Thrower') } })
const Boundary = defineComponent({
  // eslint-disable-next-line vue/no-unused-components -- used in the runtime-compiled template string
  components: { Thrower },
  data: () => ({ err: '' }),
  errorCaptured(err: unknown, _vm: unknown, info: string) {
    this.err = `${(err as Error).message} (${info})`
    log(`errorCaptured: ${this.err}`, 'error')
    return false // stop propagation
  },
  template: `<p v-if="err" class="text-sm text-red-500">caught: {{ err }}</p><Thrower v-else />`,
})

const show = ref(true)
const kept = ref(false)
const n = ref(0)
const boom = ref(false)
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <div class="row">
        <button @click="show = !show">{{ show ? 'hide' : 'show' }}</button>
        <button @click="n++">prop n++</button>
        <label class="row text-sm"><input v-model="kept" type="checkbox" /> KeepAlive</label>
        <button @click="boom = true">mount error boundary</button>
      </div>
      <KeepAlive v-if="kept"><Child v-if="show" :n /></KeepAlive>
      <Child v-else-if="show" :n />
      <Boundary v-if="boom" />
    </div>
    <EventLog :log="events" height="20rem" />
  </div>
</template>
