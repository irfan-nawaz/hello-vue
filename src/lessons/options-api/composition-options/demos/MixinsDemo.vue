<script setup lang="ts">
import { computed, defineComponent } from 'vue'

// a mixin: options merged into the component
const mouseMixin = defineComponent({
  data: () => ({ x: 0, y: 0, source: 'mouseMixin' }),
  mounted() {
    window.addEventListener('mousemove', this.onMove)
  },
  unmounted() {
    window.removeEventListener('mousemove', this.onMove)
  },
  methods: {
    onMove(e: MouseEvent) {
      this.x = e.pageX
      this.y = e.pageY
    },
  },
})
// another mixin that ALSO defines `source` — name clash, component/last wins silently
const otherMixin = defineComponent({ data: () => ({ source: 'otherMixin' }) })

// extends: like a single mixin, meant for inheriting from a base component
const Base = defineComponent({
  name: 'BaseCard',
  inheritAttrs: false, // attrs won't land on the root automatically…
  props: { title: String },
  computed: { upper(): string { return (this.title ?? '').toUpperCase() } },
})

const Card = defineComponent({
  name: 'FancyCard', // used by devtools, KeepAlive include, recursion
  extends: Base,
  mixins: [mouseMixin, otherMixin],
  // provide/inject options — provide as a function to access `this`
  provide() {
    return { cardTitle: computed(() => this.title) }
  },
  // local registration of components and directives
  components: {
    // eslint-disable-next-line vue/no-unused-components -- used in the runtime-compiled template string
    Inner: defineComponent({
      inject: { t: { from: 'cardTitle', default: 'none' } },
      template: '<i>inject option: {{ t }}</i>',
    }),
  },
  directives: {
    upper: { mounted: (el: HTMLElement) => (el.style.textTransform = 'uppercase') },
  },
  template: `
    <div class="box stack" v-bind="$attrs">
      <b>{{ upper }}</b> <span class="mono">($options.name = {{ $options.name }})</span>
      <span class="mono">mouse from mixin: {{ x }}, {{ y }}</span>
      <span class="mono">data.source (clash!) = {{ source }}</span>
      <Inner />
      <span v-upper>v-upper from local directives option</span>
    </div>`,
})
</script>

<template>
  <Card title="mixins + extends" data-note="bound via $attrs manually" />
</template>
