<script setup lang="ts">
import {
  cloneVNode, defineComponent, h, isVNode, mergeProps, ref, resolveComponent, withModifiers,
  type FunctionalComponent, type VNode,
} from 'vue'
import { VNodeTree } from '@/kit'

// 1. setup() returning a render function — state lives in the closure
const Counter = defineComponent({
  props: { step: { type: Number, default: 1 } },
  setup(props, { slots, expose }) {
    const count = ref(0)
    expose({ reset: () => (count.value = 0) })
    return () =>
      h('div', { class: 'row' }, [
        // h(type, props, children) — events are onXxx props
        h('button', { onClick: () => (count.value += props.step) }, `+${props.step}`),
        // withModifiers = the runtime behind @click.right.prevent
        h('button', { onContextmenu: withModifiers(() => (count.value = 0), ['prevent']) }, 'right-click resets'),
        h('b', count.value),
        slots.default?.({ count: count.value }), // calling a (scoped) slot
      ])
  },
})

// 2. functional component: just a function of props → vnodes, no instance
const Heading: FunctionalComponent<{ level: 1 | 2 | 3 | 4 }> = (props, { slots }) =>
  h(`h${props.level}`, { class: 'font-semibold' }, slots.default?.())
Heading.props = ['level']

// 3. Options API `render` option with `this`
const OptionsRender = defineComponent({
  data: () => ({ msg: 'render() option with this.msg' }),
  render() {
    return h('i', this.msg)
  },
})

// 4. resolveComponent: look up a *registered* component by name (RouterLink is global)
const UsesRegistered = defineComponent({
  setup() {
    const RouterLink = resolveComponent('RouterLink')
    return () => h(RouterLink, { to: '/components/registration', class: 'underline' }, () => 'resolveComponent("RouterLink")')
  },
})

// 5. helpers
const base = h('span', { class: 'a', onClick: () => console.log('base') }, 'original')
const clone = cloneVNode(base, { class: 'b text-vue', id: 'cloned' }) // merges props like mergeProps
const merged = mergeProps({ class: 'x', style: { color: 'red' }, onClick: () => {} }, { class: 'y', style: { fontWeight: 700 }, onClick: () => {} })
const mergedSummary = { ...merged, onClick: Array.isArray(merged.onClick) ? `[${merged.onClick.length} handlers]` : 'fn' }

const level = ref<1 | 2 | 3 | 4>(3)
const sample: VNode = h('ul', { id: 'list' }, [h('li', { key: 1 }, 'one'), h('li', { key: 2 }, 'two')])
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <Counter :step="2" v-slot="{ count }"><span class="text-xs">(slot sees {{ count }})</span></Counter>
      <div class="row">
        <select v-model.number="level" aria-label="level"><option v-for="l in 4" :key="l" :value="l">h{{ l }}</option></select>
        <Heading :level>Functional heading</Heading>
      </div>
      <OptionsRender />
      <UsesRegistered />
      <component :is="clone" />
      <p class="mono">isVNode(clone) = {{ isVNode(clone) }} · isVNode('x') = {{ isVNode('x') }}</p>
      <p class="mono break-all">mergeProps → {{ mergedSummary }}</p>
    </div>
    <div class="box">
      <div class="label mb-2">h('ul', …) as a tree</div>
      <VNodeTree :node="sample" />
    </div>
  </div>
</template>
