<!-- generic="T": the component is generic — props, emits and slots are typed by the caller's data -->
<script setup lang="ts" generic="T extends string | number, Item extends { value: T; label: string }">
defineOptions({ name: 'GenericSelect', inheritAttrs: false })

defineProps<{ items: Item[] }>()
const model = defineModel<T>()
defineSlots<{ option(props: { item: Item; selected: boolean }): unknown }>()
</script>

<template>
  <div class="row" v-bind="$attrs">
    <button v-for="item in items" :key="item.value" :aria-pressed="model === item.value" @click="model = item.value">
      <slot name="option" :item :selected="model === item.value">{{ item.label }}</slot>
    </button>
  </div>
</template>
