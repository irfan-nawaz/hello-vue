<script setup lang="ts">
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

// props: true → route params arrive as props (decoupled from the router)
const props = defineProps<{ id: string }>()
const dirty = ref(false)
const updates = ref(0)

// same component, new params (/users/1 → /users/2): the instance is REUSED
onBeforeRouteUpdate((to, from) => {
  updates.value++
  console.log(`user ${from.params.id} → ${to.params.id}`)
})
// in-component leave guard: return false to cancel navigation
onBeforeRouteLeave(() => (dirty.value ? window.confirm('Discard unsaved changes?') : true))
</script>

<template>
  <div class="stack">
    <p>User <b>#{{ props.id }}</b> · reused for {{ updates }} param changes</p>
    <label class="row text-sm"><input v-model="dirty" type="checkbox" /> unsaved changes (leave guard asks)</label>
  </div>
</template>
