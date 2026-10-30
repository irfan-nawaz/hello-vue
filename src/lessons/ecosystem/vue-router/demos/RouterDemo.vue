<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { EventLog, useEventLog } from '@/kit'
import { loggedIn } from './auth'

const route = useRoute()
const router = useRouter()
const events = useEventLog()

// global guards & hooks — they return a function to remove them
const removers = [
  router.beforeEach((to, from) => events.log(`beforeEach ${from.fullPath} → ${to.fullPath}`, 'hook')),
  router.beforeResolve((to) => events.log(`beforeResolve ${String(to.name)}`, 'info')),
  router.afterEach((to, _from, failure) =>
    events.log(failure ? `afterEach: navigation failed (${failure.message})` : `afterEach ${to.fullPath}`, failure ? 'error' : 'success'),
  ),
]
onUnmounted(() => removers.forEach((r) => r()))

const info = computed(() => ({
  name: route.name,
  path: route.path,
  params: route.params,
  query: route.query,
  hash: route.hash,
  meta: Object.fromEntries(Object.entries(route.meta).filter(([k]) => k !== 'lesson')),
  matched: route.matched.map((r) => r.name ?? r.path),
}))
const base = '/ecosystem/vue-router'
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <nav class="row text-sm">
        <!-- RouterLink: active classes are added automatically -->
        <RouterLink :to="{ name: 'router-home' }" class="rounded px-2 py-1 [&.router-link-exact-active]:bg-vue [&.router-link-exact-active]:text-white">home</RouterLink>
        <RouterLink :to="{ name: 'router-user', params: { id: 1 } }" class="rounded px-2 py-1 [&.router-link-active]:bg-vue [&.router-link-active]:text-white">user 1</RouterLink>
        <RouterLink :to="`${base}/users/2?tab=posts#bio`" class="rounded px-2 py-1 [&.router-link-active]:bg-vue [&.router-link-active]:text-white">user 2 + query/hash</RouterLink>
        <RouterLink :to="{ name: 'router-admin' }" class="rounded px-2 py-1 [&.router-link-active]:bg-vue [&.router-link-active]:text-white">admin (guarded)</RouterLink>
      </nav>
      <div class="row">
        <button @click="router.push({ name: 'router-user', params: { id: Math.ceil(Math.random() * 99) } })">push random user</button>
        <button @click="router.replace({ query: { ...route.query, t: Date.now() % 1000 } })">replace query</button>
        <button @click="router.back()">back()</button>
        <button @click="loggedIn = !loggedIn">{{ loggedIn ? 'log out' : 'log in' }}</button>
      </div>
      <div class="box grid gap-2 sm:grid-cols-[1fr_auto]">
        <RouterView />
        <RouterView name="aside" />
      </div>
      <pre class="mono box overflow-x-auto">useRoute() = {{ info }}</pre>
    </div>
    <EventLog :log="events" height="24rem" title="navigation guards" />
  </div>
</template>
