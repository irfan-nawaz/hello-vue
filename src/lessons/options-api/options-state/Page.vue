<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    The Options API describes a component with an object of options. Everything ends up on the component instance,
    accessible through <code>this</code>. It's implemented on top of the Composition API.
  </p>
  <Demo name="OptionsDemo" title="One component using every state option" :files="['demos/TodoOptions.vue']" />
  <h2>Mapping to the Composition API</h2>
  <table>
    <tbody>
      <tr><td><code>data()</code></td><td><code>reactive()</code> / <code>ref()</code></td></tr>
      <tr><td><code>computed: {}</code></td><td><code>computed()</code></td></tr>
      <tr><td><code>methods: {}</code></td><td>plain functions</td></tr>
      <tr><td><code>watch: {}</code></td><td><code>watch()</code></td></tr>
      <tr><td><code>props / emits / expose / slots</code></td><td><code>defineProps / defineEmits / defineExpose / defineSlots</code></td></tr>
      <tr><td><code>template / render</code></td><td>SFC template / setup returning a render fn</td></tr>
    </tbody>
  </table>
  <h2>TypeScript with the Options API</h2>
  <CodeBlock lang="ts" code="export default defineComponent({
  props: { book: Object as PropType<Book> },        // complex prop types
  emits: { save: (b: Book) => true },               // typed payloads
  computed: { label(): string { return '…' } },     // annotate computed return types
  methods: { handle(e: Event) {} },                 // annotate event args
})" />
  <Callout type="info">
    Want it all together with <code>&lt;script setup&gt;</code>? <code>setup()</code> can live inside an Options component and its
    returned bindings are exposed on <code>this</code> — handy for gradual migration.
  </Callout>
</template>
