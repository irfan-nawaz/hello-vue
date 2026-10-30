<script lang="ts">
// A normal <script> next to <script setup>: runs ONCE per module (not per instance).
// Use it for module-level state, named exports, or options not expressible as macros.
let instances = 0
export const MODULE_LOADED_AT = new Date().toLocaleTimeString()
</script>

<script setup lang="ts">
import { ref } from 'vue' // imports are exposed to the template too
import { useMouse } from '@vueuse/core'

// runs per instance
const id = ++instances
const local = ref(0)
const { x } = useMouse()
</script>

<template>
  <p class="mono">
    instance #{{ id }} · module loaded {{ MODULE_LOADED_AT }} · local {{ local }}
    <button @click="local++">+</button> · mouse x {{ x }}
  </p>
</template>
