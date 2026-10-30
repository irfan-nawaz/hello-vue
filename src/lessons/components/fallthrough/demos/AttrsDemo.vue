<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import FancyButton from './FancyButton.vue'
import LabeledInput from './LabeledInput.vue'
import MultiRoot from './MultiRoot.vue'

const clicks = ref(0)
const html = ref<string[]>([])
const area = useTemplateRef<HTMLElement>('area')
onMounted(() => {
  html.value = [...area.value!.children].map((el) => el.outerHTML.replace(/ data-v-\w+(="")?/g, ''))
})
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div ref="area" class="stack">
      <FancyButton class="large ring-2 ring-vue" data-testid="fancy" @click="clicks++" />
      <LabeledInput label="Email" type="email" placeholder="attrs land on the input" class="ignored-on-root" />
      <MultiRoot id="multi" />
    </div>
    <div class="stack">
      <p class="text-sm">FancyButton @click fell through: clicked {{ clicks }}×</p>
      <span class="label">rendered HTML</span>
      <pre v-for="(h, i) in html" :key="i" class="mono box overflow-x-auto whitespace-pre-wrap">{{ h }}</pre>
    </div>
  </div>
</template>
