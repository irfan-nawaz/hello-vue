<script setup lang="ts">
import { computed } from 'vue'
import { InfoIcon, LightbulbIcon, OctagonAlertIcon, TriangleAlertIcon } from '@lucide/vue'

const props = withDefaults(
  defineProps<{ type?: 'info' | 'tip' | 'warn' | 'danger'; title?: string }>(),
  { type: 'info', title: undefined },
)

const styles = {
  info: { icon: InfoIcon, cls: 'border-sky-500/40 bg-sky-500/5 [&_svg]:text-sky-500' },
  tip: { icon: LightbulbIcon, cls: 'border-vue/50 bg-vue/5 [&_svg]:text-vue' },
  warn: { icon: TriangleAlertIcon, cls: 'border-amber-500/50 bg-amber-500/5 [&_svg]:text-amber-500' },
  danger: { icon: OctagonAlertIcon, cls: 'border-red-500/50 bg-red-500/5 [&_svg]:text-red-500' },
}
const style = computed(() => styles[props.type])
</script>

<template>
  <div :class="['my-4 flex gap-3 rounded-lg border-l-4 border p-4 text-sm', style.cls]" role="note">
    <component :is="style.icon" class="mt-0.5 size-4 shrink-0" />
    <div class="min-w-0 [&>p]:my-1">
      <p v-if="title" class="font-semibold">{{ title }}</p>
      <slot />
    </div>
  </div>
</template>
