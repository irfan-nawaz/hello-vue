<script setup lang="ts">
import { nextTick, ref, useId, useTemplateRef } from 'vue'

// useId(): unique, SSR-stable ids to connect labels, descriptions and controls
const emailId = useId()
const hintId = useId()
const errorId = useId()
const email = ref('')
const error = ref('')
const status = ref('')
const errorEl = useTemplateRef<HTMLElement>('errorEl')

async function submit() {
  error.value = email.value.includes('@') ? '' : 'Please enter a valid email address.'
  if (error.value) {
    await nextTick()
    errorEl.value?.focus() // move focus to the problem
  } else {
    status.value = `Subscribed ${email.value} at ${new Date().toLocaleTimeString()}` // announced by aria-live
  }
}

// a custom toggle that behaves like a native switch
const on = ref(false)
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <form class="stack" novalidate @submit.prevent="submit">
      <label :for="emailId" class="text-sm font-medium">Email</label>
      <input
        :id="emailId"
        v-model="email"
        type="email"
        autocomplete="email"
        :aria-describedby="error ? `${hintId} ${errorId}` : hintId"
        :aria-invalid="!!error"
      />
      <small :id="hintId" class="text-muted-foreground">We'll never share it. (ids: {{ emailId }}, {{ hintId }})</small>
      <p v-if="error" :id="errorId" ref="errorEl" tabindex="-1" class="text-sm text-red-500">{{ error }}</p>
      <button>Subscribe</button>
      <!-- polite live region: screen readers announce changes without moving focus -->
      <p role="status" aria-live="polite" class="text-sm text-vue">{{ status }}</p>
    </form>
    <div class="stack">
      <span class="label">custom switch: role, state, keyboard</span>
      <button
        role="switch"
        :aria-checked="on"
        class="w-fit"
        @click="on = !on"
      >
        <span :class="['inline-block size-3 rounded-full', on ? 'bg-vue' : 'bg-muted-foreground']" /> Dark sidebar: {{ on ? 'on' : 'off' }}
      </button>
      <p class="text-xs text-muted-foreground">
        Using a real &lt;button&gt; gives focus, Enter/Space and semantics for free. A clickable &lt;div&gt; gives you none of that.
        Tab through this page — every interactive element is reachable.
      </p>
    </div>
  </div>
</template>
