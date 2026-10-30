<script lang="ts">
import { defineComponent, useModel } from 'vue'

// useModel() is the helper defineModel() compiles to — usable in
// non-<script setup> components that declare the prop + update event
export default defineComponent({
  props: { on: Boolean },
  emits: ['update:on'],
  setup(props) {
    const value = useModel(props, 'on') // a local ref synced with the `on` prop
    return { value }
  },
})
</script>

<template>
  <button :class="value ? 'bg-vue! text-white' : ''" @click="value = !value">{{ value ? 'ON' : 'OFF' }}</button>
</template>
