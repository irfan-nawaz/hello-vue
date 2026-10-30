<script setup lang="ts">
import { createApp, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { i18nPlugin } from './i18nPlugin'
import Greeting from './Greeting.vue'

// Mount a separate app so the plugin is installed only there
const host = useTemplateRef<HTMLElement>('host')
const app = createApp(Greeting).use(i18nPlugin, {
  locale: 'en',
  messages: {
    en: { hello: 'Hello!', bye: 'Goodbye', switch: 'Switch language' },
    fr: { hello: 'Bonjour !', bye: 'Au revoir', switch: 'Changer de langue' },
    ja: { hello: 'こんにちは！', bye: 'さようなら', switch: '言語を切り替える' },
  },
})
onMounted(() => app.mount(host.value!))
onBeforeUnmount(() => app.unmount())
</script>

<template>
  <div ref="host" class="box" />
</template>
