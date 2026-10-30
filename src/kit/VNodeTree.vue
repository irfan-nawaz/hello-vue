<script setup lang="ts">
import { computed } from 'vue'
import { Comment, Fragment, Text, type VNode } from 'vue'
import { PatchFlags, ShapeFlags, decode } from './flags'

defineOptions({ name: 'VNodeTree' })
const props = withDefaults(defineProps<{ node: VNode | string; depth?: number }>(), { depth: 0 })

const info = computed(() => {
  const n = props.node
  if (typeof n === 'string') return null
  const t = n.type
  const type =
    t === Text ? '#text' : t === Comment ? '#comment' : t === Fragment ? 'Fragment'
      : typeof t === 'string' ? t
      : typeof t === 'object' || typeof t === 'function'
        ? `<${(t as { name?: string; __name?: string }).name ?? (t as { __name?: string }).__name ?? 'Anonymous'}>`
        : String(t)
  const children = Array.isArray(n.children)
    ? (n.children as (VNode | string)[])
    : typeof n.children === 'string'
      ? [n.children]
      : []
  const propKeys = n.props ? Object.keys(n.props) : []
  return {
    type,
    key: n.key,
    propKeys,
    patch: decode(n.patchFlag, PatchFlags),
    shape: decode(n.shapeFlag, ShapeFlags),
    // internal field (block tree) — not part of the public VNode type
    dynamicChildren: (n as { dynamicChildren?: VNode[] | null }).dynamicChildren?.length,
    slots: n.children && typeof n.children === 'object' && !Array.isArray(n.children),
    children,
  }
})
</script>

<template>
  <div class="font-mono text-xs" :style="{ paddingLeft: depth ? '1rem' : 0 }">
    <div v-if="!info" class="border-l py-0.5 pl-2 text-muted-foreground">"{{ node }}"</div>
    <details v-else open class="border-l pl-2">
      <summary class="cursor-pointer py-0.5">
        <span class="font-semibold text-vue">{{ info.type }}</span>
        <span v-if="info.key != null" class="text-amber-600"> key={{ info.key }}</span>
        <span v-if="info.propKeys.length" class="text-sky-600"> {{ info.propKeys.join(' ') }}</span>
        <span v-for="f in info.patch" :key="f" class="ml-1 rounded bg-amber-500/15 px-1">{{ f }}</span>
        <span v-for="f in info.shape" :key="f" class="ml-1 rounded bg-muted px-1 text-muted-foreground">{{ f }}</span>
        <span v-if="info.dynamicChildren !== undefined" class="ml-1 rounded bg-vue/15 px-1 text-vue">
          dynamicChildren: {{ info.dynamicChildren }}
        </span>
        <span v-if="info.slots" class="ml-1 text-muted-foreground">{ slots }</span>
      </summary>
      <VNodeTree v-for="(c, i) in info.children" :key="i" :node="c" :depth="depth + 1" />
    </details>
  </div>
</template>
