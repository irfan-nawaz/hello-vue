<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { EventLog, StateInspector, useEventLog } from '@/kit'
import { useCartStore } from './cartStore'
import { usePrefsStore } from './prefsStore'
import CartWidget from './CartWidget.vue'

const cart = useCartStore()
const prefs = usePrefsStore()
const events = useEventLog()
const error = ref('')

const products = [
  { id: 1, name: 'Vue mug', price: 12 },
  { id: 2, name: 'Pinia plush', price: 25 },
  { id: 3, name: 'Vite hoodie', price: 60 },
]

// $subscribe: react to state mutations (type: direct | patch object | patch function)
const unsub = cart.$subscribe((mutation) => events.log(`$subscribe: ${mutation.type}`, 'effect'))
// $onAction: wrap every action call — before, after (resolved) and onError
const unAction = cart.$onAction(({ name, args, after, onError }) => {
  const t = performance.now()
  events.log(`$onAction: ${name}(${JSON.stringify(args).slice(1, -1)})`, 'hook')
  after(() => events.log(`  ✓ ${name} done in ${(performance.now() - t).toFixed(0)}ms`, 'success'))
  onError((e) => events.log(`  ✗ ${name} failed: ${(e as Error).message}`, 'error'))
})
onUnmounted(() => (unsub(), unAction()))

async function checkout() {
  error.value = ''
  try {
    await cart.checkout()
  } catch (e) {
    error.value = (e as Error).message
  }
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <div class="row">
        <button v-for="p in products" :key="p.id" @click="cart.add(p)">+ {{ p.name }} ({{ prefs.symbol }}{{ p.price }})</button>
      </div>
      <div class="row">
        <input v-model="cart.coupon" placeholder="coupon (try VUE10)" class="w-40" />
        <!-- $patch: group several changes into ONE mutation / one subscription call -->
        <button @click="cart.$patch({ coupon: 'VUE10' })">$patch(object)</button>
        <button @click="cart.$patch((s) => s.items.forEach((i) => (i.qty = 1)))">$patch(fn): qty=1</button>
      </div>
      <div class="row">
        <button @click="checkout">checkout() (async action)</button>
        <button :disabled="cart.$undoDepth() === 0" @click="cart.$undo()">$undo() ({{ cart.$undoDepth() }}) — plugin</button>
        <button @click="cart.$reset()">$reset()</button>
      </div>
      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      <CartWidget />
      <div class="row text-sm">
        options store:
        <select v-model="prefs.currency" aria-label="currency"><option>USD</option><option>EUR</option><option>INR</option></select>
        <button @click="prefs.$reset()">prefs.$reset() (built in for options stores)</button>
      </div>
    </div>
    <div class="stack">
      <StateInspector :value="cart.$state" label="cart.$state" />
      <EventLog :log="events" height="12rem" title="$subscribe / $onAction" />
    </div>
  </div>
</template>
