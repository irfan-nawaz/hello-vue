<script lang="ts">
import { defineComponent } from 'vue'

// Options API / setup() style: `emits` option with a validator,
// and `emit` taken from the setup context ({ attrs, slots, emit, expose })
export default defineComponent({
  emits: {
    submit: (payload: { email: string }) => {
      const ok = payload.email.includes('@')
      if (!ok) console.warn('Invalid submit payload!')
      return ok // false → dev warning, but the event is still emitted
    },
  },
  setup(_props, { emit }) {
    return { send: (email: string) => emit('submit', { email }) }
  },
})
</script>

<template>
  <div class="row">
    <button @click="send('ada@example.com')">emit valid</button>
    <button @click="send('not-an-email')">emit invalid</button>
  </div>
</template>
