<script setup lang="ts">
import { reactive, shallowReactive, shallowReadonly, shallowRef, triggerRef } from 'vue'

// shallowRef: only `.value` assignment is tracked — nested mutations are invisible
const shallow = shallowRef({ count: 0 })
const mutateNested = () => shallow.value.count++ // no update!
const force = () => triggerRef(shallow) // manually notify dependents
const replace = () => (shallow.value = { count: shallow.value.count + 1 }) // tracked

// shallowReactive: only root-level properties are reactive
const sr = shallowReactive({ top: 0, nested: { deep: 0 } })

// shallowReadonly: root is readonly, nested objects are still mutable
const config = shallowReadonly({ name: 'cfg', nested: reactive({ value: 1 }) })
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="box stack">
      <span class="label">shallowRef + triggerRef</span>
      <p class="mono">shallow.value.count = {{ shallow.count }}</p>
      <button @click="mutateNested">.value.count++ (silent)</button>
      <button @click="force">triggerRef(shallow)</button>
      <button @click="replace">replace .value</button>
    </div>
    <div class="box stack">
      <span class="label">shallowReactive</span>
      <p class="mono">top={{ sr.top }} deep={{ sr.nested.deep }}</p>
      <button @click="sr.top++">top++ (tracked)</button>
      <button @click="sr.nested.deep++">nested.deep++ (silent until next render)</button>
    </div>
    <div class="box stack">
      <span class="label">shallowReadonly</span>
      <p class="mono">name={{ config.name }} nested={{ config.nested.value }}</p>
      <button @click="(config as { name: string }).name = 'x'">write root (⚠ warns)</button>
      <button @click="config.nested.value++">write nested (allowed)</button>
    </div>
  </div>
</template>
