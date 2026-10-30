<script setup lang="ts">
import {
  computed, isProxy, isReactive, isReadonly, isRef, isShallow, markRaw, reactive, readonly, ref,
  shallowReactive, shallowReadonly, shallowRef,
} from 'vue'

const raw = { a: 1 }
const subjects: Record<string, unknown> = {
  '{ a: 1 } (plain)': raw,
  'ref(1)': ref(1),
  'shallowRef({})': shallowRef({}),
  'computed(() => 1)': computed(() => 1),
  'reactive({})': reactive({ n: { deep: 1 } }),
  'reactive({}).n (nested)': reactive({ n: { deep: 1 } }).n,
  'shallowReactive({})': shallowReactive({ n: {} }),
  'readonly({})': readonly({ a: 1 }),
  'readonly(reactive({}))': readonly(reactive({})),
  'shallowReadonly({})': shallowReadonly({}),
  'markRaw({})': markRaw({}),
  'reactive(markRaw({}))': reactive(markRaw({})),
}
const checks = { isRef, isProxy, isReactive, isReadonly, isShallow }
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-xs">
      <thead>
        <tr><th class="text-left">value</th><th v-for="(_, c) in checks" :key="c" class="mono">{{ c }}()</th></tr>
      </thead>
      <tbody>
        <tr v-for="(v, label) in subjects" :key="label">
          <td class="mono">{{ label }}</td>
          <td v-for="(fn, c) in checks" :key="c" class="text-center">
            <span :class="fn(v) ? 'font-bold text-vue' : 'text-muted-foreground/40'">{{ fn(v) ? '✓' : '·' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
