<script setup lang="ts">
import { computed, defineComponent, h, provide, ref } from 'vue'
import { EventLog, useEventLog } from '@/kit'
import CounterTab from './CounterTab.vue'

const events = useEventLog()
provide('log', events)

// KeepAlive include/exclude match the component's *name* — so give each tab one
const make = (name: string) => defineComponent({ name, setup: () => () => h(CounterTab, { label: name }) })
const tabs = { TabA: make('TabA'), TabB: make('TabB'), TabC: make('TabC') }
type Name = keyof typeof tabs

const current = ref<Name>('TabA')
const enabled = ref(true)
const include = ref<Name[]>(['TabA', 'TabB', 'TabC'])
const max = ref(2)
const comp = computed(() => tabs[current.value])
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack text-sm">
      <div class="row">
        <button v-for="(_, n) in tabs" :key="n" :class="{ 'ring-2 ring-vue': current === n }" @click="current = n">{{ n }}</button>
      </div>
      <label class="row"><input v-model="enabled" type="checkbox" /> &lt;KeepAlive&gt;</label>
      <div class="row">include:
        <label v-for="(_, n) in tabs" :key="n" class="row"><input v-model="include" type="checkbox" :value="n" /> {{ n }}</label>
      </div>
      <label class="row">max {{ max }} (least-recently-used gets evicted) <input v-model.number="max" type="range" min="1" max="3" /></label>
      <div class="box">
        <KeepAlive v-if="enabled" :include :max>
          <component :is="comp" />
        </KeepAlive>
        <component :is="comp" v-else />
      </div>
    </div>
    <EventLog :log="events" height="18rem" />
  </div>
</template>
