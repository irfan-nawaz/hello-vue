<script setup lang="ts">
import { ref } from 'vue'
import RatingInput from './RatingInput.vue'
import NameFields from './NameFields.vue'
import ToggleUseModel from './ToggleUseModel.vue'

const rating = ref(3)
const first = ref('ada')
const last = ref('lovelace')
const on = ref(false)
</script>

<template>
  <div class="stack">
    <div class="row"><RatingInput v-model="rating" /> <span class="mono">rating = {{ rating }}</span></div>
    <div class="row"><NameFields v-model:first="first" v-model:last.capitalize="last" /> <span class="mono">{{ first }} {{ last }}</span></div>
    <div class="row"><ToggleUseModel v-model:on="on" /> <span class="mono">on = {{ on }}</span></div>
  </div>
</template>
