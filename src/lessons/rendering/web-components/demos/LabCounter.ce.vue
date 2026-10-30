<script setup lang="ts">
import { onMounted, ref, useHost, useShadowRoot } from 'vue'

// *.ce.vue: <style> is inlined into the shadow root
const props = defineProps<{ label?: string; start?: number }>()
const emit = defineEmits<{ changed: [count: number] }>()
const count = ref(props.start ?? 0)

const host = useHost() // the <lab-counter> element itself
const shadow = useShadowRoot() // its shadow root
const info = ref('')
onMounted(() => {
  info.value = `host: <${host?.tagName.toLowerCase()}> · shadowRoot mode: ${shadow?.mode}`
})

function inc() {
  count.value++
  host?.setAttribute('data-count', String(count.value))
  emit('changed', count.value) // dispatched as a native CustomEvent (detail = [count])
}
</script>

<template>
  <div class="wrap">
    <button @click="inc">{{ label ?? 'count' }}: {{ count }}</button>
    <slot><small>(default slot)</small></slot>
    <p class="info">{{ info }}</p>
  </div>
</template>

<style>
/* scoped by the shadow DOM — the page's Tailwind styles can't reach in, these can't leak out */
.wrap {
  border: 2px solid #42b883;
  border-radius: 10px;
  padding: 8px 12px;
  font-family: system-ui;
}
button {
  background: #42b883;
  color: white;
  border: 0;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}
.info {
  font: 11px monospace;
  opacity: 0.7;
  margin: 6px 0 0;
}
</style>
