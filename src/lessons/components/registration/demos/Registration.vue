<script setup lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import LocalChild from './LocalChild.vue'

// Globally registered components live on the app context
const globals = Object.keys(getCurrentInstance()!.appContext.components)

// Options API: local registration via the `components` option
const OptionsParent = defineComponent({
  components: { LocalChild },
  template: `<LocalChild from="options components: {}" /> <local-child from="kebab-case works too" />`,
})
</script>

<template>
  <div class="stack">
    <!-- <script setup>: an import IS a local registration -->
    <LocalChild from="script setup import" />
    <OptionsParent />
    <!-- RouterLink / RouterView were registered globally by app.use(router) -->
    <p class="text-sm">
      Global components in this app: <code class="mono">{{ globals.join(', ') }}</code>
    </p>
  </div>
</template>
