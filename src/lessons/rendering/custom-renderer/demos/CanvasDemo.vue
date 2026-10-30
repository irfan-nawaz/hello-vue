<script setup lang="ts">
import { defineComponent, h, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef, type App } from 'vue'
import { createCanvasRenderer, type CNode } from './canvasRenderer'

// Shared reactive state: the DOM UI below and the canvas app both use it
const state = reactive({ balls: 3, radius: 18, hue: 160, x: 50 })

// A normal Vue component — but its render output is shapes, not DOM
const Scene = defineComponent(() => () =>
  h('group', {}, [
    h('rect', { x: 0, y: 0, w: 480, h: 160, fill: '#1112' }),
    ...Array.from({ length: state.balls }, (_, i) =>
      h('circle', {
        key: i,
        cx: (state.x / 100) * 400 + 40 + i * 30 - state.balls * 15,
        cy: 80 + Math.sin(i + state.x / 10) * 40,
        r: state.radius,
        fill: `oklch(0.7 0.15 ${state.hue + i * 25})`,
      }),
    ),
    h('label', { x: 12, y: 24 }, `${state.balls} balls rendered by a custom renderer`),
  ]),
)

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const root: CNode = { type: 'root', props: {}, children: [], parent: null }
const stats = ref('')

function draw() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, 480, 160)
  const paint = (n: CNode) => {
    type Shape = { x: number; y: number; w: number; h: number; cx: number; cy: number; r: number; fill?: string }
    const p = n.props as Shape
    ctx.fillStyle = p.fill ?? '#888'
    if (n.type === 'rect') ctx.fillRect(p.x, p.y, p.w, p.h)
    if (n.type === 'circle') {
      ctx.beginPath()
      ctx.arc(p.cx, p.cy, p.r, 0, Math.PI * 2)
      ctx.fill()
    }
    if (n.type === 'label') {
      ctx.fillStyle = '#888'
      ctx.font = '12px monospace'
      ctx.fillText(n.text ?? '', p.x, p.y)
    }
    n.children.forEach(paint)
  }
  paint(root)
  const { created, inserted, removed, patched } = renderer.ops
  stats.value = `createElement ×${created} · insert ×${inserted} · remove ×${removed} · patchProp ×${patched}`
}

const renderer = createCanvasRenderer(draw)
let app: App<CNode> | undefined
onMounted(() => {
  app = renderer.createApp(Scene)
  app.mount(root)
})
onBeforeUnmount(() => app?.unmount())
</script>

<template>
  <div class="stack">
    <canvas ref="canvas" width="480" height="160" class="max-w-full self-start rounded-lg border" />
    <div class="row text-sm">
      <label class="row">balls {{ state.balls }} <input v-model.number="state.balls" type="range" min="0" max="12" /></label>
      <label class="row">x <input v-model.number="state.x" type="range" min="0" max="100" /></label>
      <label class="row">radius <input v-model.number="state.radius" type="range" min="4" max="40" /></label>
      <label class="row">hue <input v-model.number="state.hue" type="range" min="0" max="360" /></label>
    </div>
    <p class="mono text-muted-foreground">{{ stats }}</p>
  </div>
</template>
