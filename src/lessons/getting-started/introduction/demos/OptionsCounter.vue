<script lang="ts">
import { defineComponent } from 'vue'

// Options API: logic is organised by option type (data / computed / methods / hooks)
export default defineComponent({
  data() {
    return { count: 0 }
  },
  computed: {
    double(): number {
      return this.count * 2
    },
  },
  methods: {
    increment() {
      this.count++
    },
  },
  mounted() {
    console.log(`Options counter mounted with ${this.count}`)
  },
})
</script>

<template>
  <button @click="increment">Options: {{ count }} (double {{ double }})</button>
</template>
