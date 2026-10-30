<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    Templates compile to render functions, and you can write those directly with <code>h()</code> (hyperscript). Use them for
    highly dynamic structure (e.g. a heading whose level is a prop), library components, or when you prefer JSX.
  </p>
  <Demo name="RenderFns" title="Everything h() can do" />
  <h2>Template → render function equivalents</h2>
  <table>
    <tbody>
      <tr><td><code>v-if</code></td><td><code>ok ? h('div') : h('span')</code></td></tr>
      <tr><td><code>v-for</code></td><td><code>items.map(i => h('li', { key: i.id }, i.text))</code></td></tr>
      <tr><td><code>@click.stop</code></td><td><code>{ onClick: withModifiers(fn, ['stop']) }</code></td></tr>
      <tr><td><code>v-model</code></td><td><code>{ modelValue: x, 'onUpdate:modelValue': v => (x = v) }</code></td></tr>
      <tr><td>slots</td><td><code>h(Comp, null, { default: () => …, header: (props) => … })</code></td></tr>
      <tr><td>custom directive</td><td><code>withDirectives(h('input'), [[vFocus]])</code></td></tr>
    </tbody>
  </table>
  <h2>JSX / TSX</h2>
  <CodeBlock lang="tsx" code="// pnpm add -D @vitejs/plugin-vue-jsx, add vueJsx() to vite.config.ts
const Greeting = defineComponent((props: { name: string }) => {
  const count = ref(0)
  return () => (
    <button onClick={() => count.value++}>
      Hello {props.name} {count.value}
    </button>
  )
})" />
  <Callout type="warn">
    VNodes in a tree must be unique — to render the same one twice, create it twice (or <code>cloneVNode</code>). Render
    functions opt out of compiler optimisations (patch flags), so templates are usually faster.
  </Callout>
</template>
