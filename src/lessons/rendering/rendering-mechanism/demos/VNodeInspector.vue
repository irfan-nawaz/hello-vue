<script setup lang="ts">
import { shallowRef, triggerRef, type VNode } from 'vue'
import { VNodeTree } from '@/kit'
import LiveTarget from './LiveTarget.vue'

// the tree is produced by the child and passed up — rendering it here doesn't re-render the child
const tree = shallowRef<VNode>()
const onRendered = (t: VNode) => {
  tree.value = t
  triggerRef(tree)
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <LiveTarget @rendered="onRendered" />
    <div class="box max-h-96 overflow-auto">
      <div class="label mb-2">subTree vnodes (patchFlag · shapeFlag · dynamicChildren)</div>
      <VNodeTree v-if="tree" :node="tree" />
    </div>
  </div>
</template>
