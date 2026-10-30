<script setup lang="ts">
import { useI18n } from './i18nPlugin'

const { locale, t } = useI18n()
</script>

<template>
  <div class="stack">
    <p>$t('hello') → <b>{{ $t('hello') }}</b></p>
    <p>useI18n().t('bye') → <b>{{ t('bye') }}</b></p>
    <p>v-t directive → <b v-t="'switch'" /></p>
    <div class="row">
      <button v-for="l in ['en', 'fr', 'ja']" :key="l" :class="{ 'ring-2 ring-vue': locale === l }" @click="locale = l">{{ l }}</button>
    </div>
  </div>
</template>
