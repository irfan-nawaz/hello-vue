<script setup lang="ts">
import { ref } from 'vue'

const tag = ref<'h3' | 'p' | 'button' | 'a'>('h3')
const ok = ref(true)
const reset = ref(0)
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="box stack">
      <span class="label">&lt;component :is="tag"&gt;</span>
      <select v-model="tag" aria-label="tag"><option>h3</option><option>p</option><option>button</option><option>a</option></select>
      <!-- :is accepts a native tag name, a component name, or a component object -->
      <component :is="tag" href="#" class="font-semibold text-vue">I'm a &lt;{{ tag }}&gt;</component>
    </div>
    <div class="box stack">
      <span class="label">&lt;template&gt; (renders nothing itself)</span>
      <label class="row text-sm"><input v-model="ok" type="checkbox" /> show group</label>
      <template v-if="ok">
        <p>one</p>
        <p>two — no wrapper element in the DOM</p>
      </template>
    </div>
    <div class="box stack">
      <span class="label">:key forces re-creation</span>
      <input :key="reset" placeholder="type, then reset" />
      <button @click="reset++">change key → fresh element</button>
      <p class="text-xs text-muted-foreground">
        <code>is="vue:my-comp"</code> on a native element (e.g. inside &lt;table&gt;) renders a component in in-DOM templates.
      </p>
    </div>
  </div>
</template>
