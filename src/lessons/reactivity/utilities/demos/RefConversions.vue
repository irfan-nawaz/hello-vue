<script setup lang="ts">
import { reactive, readonly, ref, toRef, toRefs, toValue, unref } from 'vue'

const state = reactive({ foo: 1, bar: 2 })

// toRef(object, key): a ref that is two-way linked to a property
const fooRef = toRef(state, 'foo')
// toRef(getter) (3.3+): a readonly ref from a getter — cheap, no computed cache
const doubled = toRef(() => state.bar * 2)
// toRefs(object): every property as a linked ref → safe to destructure
const { bar } = toRefs(state)

// readonly(): a proxy that warns on any write (deeply)
const frozen = readonly(state)
const tryWrite = () => {
  ;(frozen as { foo: number }).foo++ // ⚠ dev warning, no change
}

const maybe = ref(5)
const results = () => ({
  'unref(ref(5))': unref(maybe),
  'unref(5)': unref(5),
  'toValue(() => 5)': toValue(() => 5),
  'unref(() => 5) (not called!)': typeof unref(() => 5),
})
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="stack">
      <p class="mono">state = {{ state }}</p>
      <div class="row">
        <button @click="fooRef++">fooRef.value++</button>
        <button @click="bar++">bar.value++ (from toRefs)</button>
        <button @click="state.foo = 0; state.bar = 0">reset via state</button>
      </div>
      <p class="mono">toRef(() => state.bar * 2) = {{ doubled }}</p>
      <div class="row"><button @click="tryWrite">write to readonly(state)</button> <span class="text-xs text-muted-foreground">→ check console warning</span></div>
    </div>
    <div class="stack">
      <p v-for="(v, k) in results()" :key="k" class="mono">{{ k }} → <b>{{ v }}</b></p>
    </div>
  </div>
</template>
