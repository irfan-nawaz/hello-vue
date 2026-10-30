<script setup lang="ts">
import { ref, useCssModule } from 'vue'
import ScopedChild from './ScopedChild.vue'

const color = ref('#42b883')
const size = ref(16)
const theme = { radius: '12px' }
const danger = ref(false)
// access a NAMED css module from script
const fx = useCssModule('fx')
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="box stack">
      <span class="label">scoped + :deep + :slotted</span>
      <p class="title">parent .title (scoped: child's isn't affected… unless :deep)</p>
      <ScopedChild><em>slotted &lt;em&gt;</em></ScopedChild>
    </div>
    <div class="box stack">
      <span class="label">CSS modules ($style / named)</span>
      <label class="row text-sm"><input v-model="danger" type="checkbox" /> danger</label>
      <p :class="[$style.badge, { [$style.danger]: danger }]">$style.badge</p>
      <p :class="fx.glow">useCssModule('fx').glow → class "{{ fx.glow }}"</p>
    </div>
    <div class="box stack">
      <span class="label">v-bind() in CSS (reactive)</span>
      <input v-model="color" type="color" class="w-12 p-0" aria-label="color" />
      <input v-model.number="size" type="range" min="10" max="32" aria-label="size" />
      <p class="dynamic">color & size from state</p>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-weight: 700;
}
/* :deep reaches into child components' elements */
.box :deep(.card .title) {
  font-style: italic;
}
.dynamic {
  /* compiled to CSS custom properties set inline on the component root, updated reactively */
  color: v-bind(color);
  font-size: v-bind(size + 'px');
  border-radius: v-bind('theme.radius');
  border: 2px solid v-bind(color);
  padding: 4px 8px;
}
</style>

<style module>
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: #42b88333;
}
.danger {
  background: #e11d4833;
  color: #e11d48;
}
</style>

<style module="fx">
.glow {
  text-shadow: 0 0 8px #42b883;
}
</style>
