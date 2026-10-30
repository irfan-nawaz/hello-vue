<script lang="ts">
import { defineComponent, type PropType } from 'vue'

interface Book {
  title: string
  year: number
}

// Runtime declaration (Options API style) — with PropType for complex types
export default defineComponent({
  props: {
    book: { type: Object as PropType<Book>, required: true },
    rating: {
      type: Number,
      default: 3,
      // custom validator: logs a dev warning if false
      validator: (v: number) => v >= 1 && v <= 5,
    },
    format: { type: Function as PropType<(b: Book) => string>, default: (b: Book) => `${b.title} (${b.year})` },
  },
  // setup(props): props is reactive — don't destructure it here, use toRefs
  setup(props) {
    return { stars: () => '★'.repeat(props.rating) }
  },
})
</script>

<template>
  <div class="box">{{ format(book) }} <span class="text-amber-500">{{ stars() }}</span> <span class="mono">rating={{ rating }}</span></div>
</template>
