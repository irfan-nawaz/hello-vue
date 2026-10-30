<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const disabled = ref(false)
const toasts = ref<number[]>([])
const toast = () => {
  const id = Date.now()
  toasts.value.push(id)
  setTimeout(() => (toasts.value = toasts.value.filter((t) => t !== id)), 2500)
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <!-- overflow-hidden + transform would normally trap a "fixed" modal inside this box -->
    <div class="box stack overflow-hidden" style="transform: translateZ(0)">
      <span class="label">component lives here (overflow: hidden; transform)</span>
      <div class="row">
        <button @click="open = true">open modal</button>
        <label class="row text-sm"><input v-model="disabled" type="checkbox" /> :disabled (render in place)</label>
        <button @click="toast">toast ×n</button>
      </div>
      <Teleport to="body" :disabled>
        <div v-if="open" class="fixed inset-0 z-50 grid place-items-center bg-black/40" @click.self="open = false">
          <div class="rounded-xl bg-background p-6 shadow-xl">
            <p class="mb-3">I'm teleported to <code>&lt;body&gt;</code> — yet I still use this component's state.</p>
            <button @click="open = false">close</button>
          </div>
        </div>
      </Teleport>
    </div>
    <div class="box stack">
      <span class="label">#toast-target (defined LATER in this template)</span>
      <div id="toast-target" class="stack min-h-16" />
    </div>
    <!-- defer (3.5+): resolve the target after the rest of this render, so it can be later in the tree.
         Multiple teleports to the same target append in order. -->
    <Teleport v-for="t in toasts" :key="t" defer to="#toast-target">
      <p class="rounded bg-vue px-3 py-1 text-sm text-white">Toast {{ t % 10000 }}</p>
    </Teleport>
  </div>
</template>
