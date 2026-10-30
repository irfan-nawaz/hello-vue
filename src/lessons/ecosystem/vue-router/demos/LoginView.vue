<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { loggedIn } from './auth'

const route = useRoute()
const router = useRouter()

function login() {
  loggedIn.value = true
  // programmatic navigation back to where the guard redirected us from
  router.replace((route.query.redirect as string) ?? { name: 'router-home' })
}
</script>

<template>
  <div class="stack">
    <p class="text-sm">Login required (redirect = <code>{{ route.query.redirect }}</code>)</p>
    <button @click="login">log in</button>
  </div>
</template>
