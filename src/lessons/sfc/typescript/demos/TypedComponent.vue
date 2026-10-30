<script setup lang="ts">
import { computed, inject, provide, ref, useAttrs, useSlots, useTemplateRef, type InjectionKey, type Ref } from 'vue'

// props: types inferred from the generic argument
const props = withDefaults(defineProps<{ title: string; tags?: string[] }>(), { tags: () => [] })

// emits: name → payload tuple
const emit = defineEmits<{ select: [tag: string]; reset: [] }>()

// refs: inferred or explicit (unions need explicit)
const year = ref<string | number>('2024')
year.value = 2025 // ok

// computed: return type inferred (or computed<string>(…))
const summary = computed(() => `${props.title} (${props.tags.length} tags)`)

// provide / inject: InjectionKey carries the type across components
const counterKey = Symbol() as InjectionKey<Ref<number>>
provide(counterKey, ref(0))
// (inject() looks at ANCESTORS, so a component never sees its own provide — hence the default)
const injected = inject(counterKey, null) // Ref<number> | null

// template refs: element type as generic
const input = useTemplateRef<HTMLInputElement>('input')

// DOM events: annotate and narrow the target
function onInput(e: Event) {
  year.value = (e.target as HTMLInputElement).value
}

// useSlots() / useAttrs(): typed slots record / attrs record
const slots = useSlots()
const attrs = useAttrs()
</script>

<template>
  <div class="box stack">
    <b>{{ summary }}</b>
    <div class="row">
      <button v-for="t in tags" :key="t" @click="emit('select', t)">{{ t }}</button>
      <button @click="emit('reset')">reset</button>
    </div>
    <input ref="input" :value="year" @input="onInput" />
    <p class="mono">year: {{ year }} ({{ typeof year }}) · injected: {{ injected }} · input el: {{ input?.tagName }}</p>
    <p class="mono">slots: [{{ Object.keys(slots) }}] · attrs: {{ attrs }}</p>
  </div>
</template>
