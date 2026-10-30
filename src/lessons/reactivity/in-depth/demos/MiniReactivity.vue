<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { EventLog, useEventLog } from '@/kit'
import { effect, onEvent, reactive, targetMap, targets } from './miniReactivity'

const events = useEventLog()
onEvent((msg) => events.log(msg, msg.startsWith('track') ? 'info' : 'warn'))

targets.clear() // fresh demo state on every mount

// --- plain JS world: no Vue reactivity below this line ---
const product = reactive({ price: 5, quantity: 2 }, 'product')
const user = reactive({ name: 'Ada', discount: 0.1 }, 'user')

// "Vue world" mirrors so the template can show results
const total = ref(0)
const greeting = ref('')
effect('totalEffect', () => {
  total.value = product.price * product.quantity * (1 - user.discount)
})
effect('greetingEffect', () => {
  greeting.value = `Hi ${user.name}!`
})

// snapshot of the dependency map for display
const depMap = shallowRef<{ dep: string; effects: string }[]>([])
function snapshot() {
  const rows: { dep: string; effects: string }[] = []
  for (const [target, name] of targets) {
    for (const [key, effects] of targetMap.get(target) ?? []) {
      rows.push({ dep: `${name}.${String(key)}`, effects: [...effects].map((e) => e.name).join(', ') })
    }
  }
  depMap.value = rows
}
snapshot()
const act = (fn: () => void) => {
  fn()
  snapshot()
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <p>total = price × quantity × (1 − discount) = <b class="mono">{{ total.toFixed(2) }}</b> · {{ greeting }}</p>
      <div class="row">
        <button @click="act(() => product.price++)">product.price++</button>
        <button @click="act(() => product.quantity++)">product.quantity++</button>
        <button @click="act(() => (user.discount = user.discount ? 0 : 0.1))">toggle discount</button>
        <button @click="act(() => (user.name = user.name === 'Ada' ? 'Grace' : 'Ada'))">rename user</button>
      </div>
      <span class="label">targetMap (dep → subscribed effects)</span>
      <table class="text-xs">
        <tbody><tr v-for="r in depMap" :key="r.dep"><td class="mono">{{ r.dep }}</td><td class="mono text-vue">{{ r.effects }}</td></tr></tbody>
      </table>
    </div>
    <EventLog :log="events" height="18rem" title="track / trigger" />
  </div>
</template>
