<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'

const show = ref(true)
const duration = ref(1200)
const stage = useTemplateRef<HTMLElement>('stage')
const classes = ref<string[]>([])

// Watch the transition classes Vue toggles on the element, frame by frame
let raf = 0
const sample = () => {
  const el = stage.value?.querySelector('.target')
  classes.value = el ? [...el.classList].filter((c) => c.startsWith('fade-')) : ['(not in DOM)']
  raf = requestAnimationFrame(sample)
}
onMounted(sample)
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2" :style="{ '--d': duration + 'ms' }">
    <div class="stack">
      <div class="row">
        <button @click="show = !show">toggle</button>
        <label class="row text-sm">duration {{ duration }}ms <input v-model.number="duration" type="range" min="200" max="3000" step="100" /></label>
      </div>
      <div ref="stage" class="box grid h-24 place-items-center">
        <Transition name="fade">
          <p v-if="show" class="target rounded bg-vue px-4 py-2 text-white">Hello</p>
        </Transition>
      </div>
    </div>
    <div class="stack">
      <span class="label">classes on the element right now</span>
      <div class="flex min-h-8 flex-wrap gap-1">
        <code v-for="c in classes" :key="c" class="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-xs">{{ c }}</code>
      </div>
      <ol class="mono space-y-0.5 text-muted-foreground">
        <li>enter: <b>-enter-from</b> + -enter-active → next frame → <b>-enter-to</b> + -enter-active → removed</li>
        <li>leave: <b>-leave-from</b> + -leave-active → next frame → <b>-leave-to</b> + -leave-active → removed from DOM</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all var(--d) ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>
