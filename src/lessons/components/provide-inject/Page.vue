<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>provide(key, value)</code> makes a value available to <b>every descendant</b>; <code>inject(key)</code> reads it from the
    nearest ancestor provider. It solves <i>prop drilling</i> — passing props through components that don't need them.
  </p>
  <Demo name="ProvideDemo" title="Theme context through untouched middle components" :files="['demos/keys.ts', 'demos/DeepChild.vue']" />
  <Callout type="tip" title="Patterns">
    Provide refs to keep reactivity · wrap in <code>readonly()</code> and provide mutation functions · use
    <code>InjectionKey&lt;T&gt;</code> Symbols for type-safety and no name clashes · inject defaults:
    <code>inject(key, default)</code> or a factory with <code>inject(key, () => …, true)</code>.
  </Callout>
</template>
