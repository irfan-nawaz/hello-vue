<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const grade = ref(75)
const visible = ref(true)
const events = useEventLog()

// A child that logs when it is created / destroyed
const Probe = {
  props: { label: String },
  setup(props: { label?: string }) {
    onMounted(() => events.log(`${props.label} mounted`, 'success'))
    onUnmounted(() => events.log(`${props.label} unmounted`, 'error'))
  },
  template: `<span class="rounded bg-muted px-2 py-1 text-sm">{{ label }}</span>`,
}

// Peek into the real DOM to show what each directive leaves behind
const area = useTemplateRef<HTMLElement>('area')
const dom = ref('')
const snapshot = () =>
  (dom.value = (area.value?.innerHTML ?? '').replace(/ (class|data-v-[\w-]+)="[^"]*"/g, ''))
const observer = new MutationObserver(snapshot)
onMounted(() => {
  observer.observe(area.value!, { subtree: true, childList: true, attributes: true })
  snapshot()
})
onBeforeUnmount(() => observer.disconnect())
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <label class="row text-sm">grade {{ grade }} <input v-model.number="grade" type="range" min="0" max="100" /></label>
      <label class="row text-sm"><input v-model="visible" type="checkbox" /> visible</label>
      <div ref="area" class="stack box">
        <Probe v-if="grade >= 90" label="v-if: A" />
        <Probe v-else-if="grade >= 70" label="v-else-if: B" />
        <Probe v-else label="v-else: C" />
        <Probe v-show="visible" label="v-show: toggles display" />
        <template v-if="visible"><b>&lt;template v-if&gt;</b><i>groups without a wrapper</i></template>
      </div>
    </div>
    <div class="stack">
      <EventLog :log="events" height="8rem" title="component mount/unmount" />
      <span class="label">live DOM</span>
      <pre class="mono box overflow-x-auto whitespace-pre-wrap">{{ dom }}</pre>
    </div>
  </div>
</template>
