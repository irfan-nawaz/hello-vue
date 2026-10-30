<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const events = useEventLog()
const external = { now: Date.now() } // NOT reactive

const Inspected = defineComponent({
  name: 'Inspected',
  props: { msg: String },
  emits: ['ping'],
  data: () => ({ count: 0 }),
  created() {
    // $watch: imperative watcher (string path or getter); returns an unwatch fn
    this.$watch('count', (v: number, old: number) => events.log(`$watch('count'): ${old} → ${v}`, 'effect'))
  },
  methods: {
    report() {
      const self = this as unknown as Record<string, unknown> & { $el: Element; $parent: { $options: { name?: string; __name?: string } } | null; $root: { $options: { name?: string } } }
      events.log(`$data = ${JSON.stringify(this.$data)}`, 'info')
      events.log(`$props = ${JSON.stringify(this.$props)}`, 'info')
      events.log(`$attrs = ${JSON.stringify(this.$attrs)}`, 'info')
      events.log(`$el = <${self.$el.tagName.toLowerCase()} class="${self.$el.className}">`, 'info')
      events.log(`$options.name = ${this.$options.name}`, 'info')
      events.log(`$parent = ${self.$parent?.$options.__name ?? self.$parent?.$options.name}`, 'info')
      events.log(`$root = ${self.$root.$options.name ?? '(App root)'}`, 'info')
      events.log(`$slots = [${Object.keys(this.$slots)}]`, 'info')
      events.log(`$refs = [${Object.keys(this.$refs)}] → btn is <${(this.$refs.btn as Element).tagName.toLowerCase()}>`, 'info')
    },
    async tick() {
      this.count++
      events.log(`before $nextTick: DOM says ${(this.$refs.out as Element).textContent}`, 'warn')
      await this.$nextTick()
      events.log(`after $nextTick: DOM says ${(this.$refs.out as Element).textContent}`, 'success')
    },
    force() {
      external.now = Date.now() // mutation Vue can't see…
      this.$forceUpdate() // …so force a re-render
    },
  },
  template: `
    <div class="box stack" data-extra="I'm an attr">
      <p>msg: {{ msg }} · count: <b ref="out">{{ count }}</b> · non-reactive now: {{ ext.now }}</p>
      <slot name="footer" />
      <div class="row">
        <button ref="btn" @click="report">log $-properties</button>
        <button @click="tick">count++ & $nextTick</button>
        <button @click="force">mutate non-reactive + $forceUpdate()</button>
        <button @click="$emit('ping', count)">$emit('ping')</button>
      </div>
    </div>`,
  computed: { ext: () => external },
})
const msg = ref('hi from parent')
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <Inspected :msg class="inspected" @ping="(c: number) => events.log(`parent got @ping(${c})`, 'event')">
      <template #footer><small>footer slot</small></template>
    </Inspected>
    <EventLog :log="events" height="20rem" />
  </div>
</template>
