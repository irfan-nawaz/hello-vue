<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    Switching dynamic components normally <b>unmounts</b> the old one, losing its state.
    <code>&lt;KeepAlive&gt;</code> caches the instance instead: it's <i>deactivated</i> (DOM detached, state kept) and
    later <i>activated</i> again.
  </p>
  <Demo name="KeepAliveDemo" title="Cache, include, max and hooks" :files="['demos/CounterTab.vue']">
    <p>With KeepAlive on, switching logs onDeactivated/onActivated instead of onUnmounted/onMounted. Set max=1 and see evictions unmount.</p>
  </Demo>
  <Callout type="tip">
    Common with the router: <code>&lt;RouterView v-slot="{ Component }"&gt;&lt;KeepAlive&gt;&lt;component :is="Component" /&gt;&lt;/KeepAlive&gt;&lt;/RouterView&gt;</code>.
    <code>onActivated</code> also fires on initial mount; <code>onDeactivated</code> also on final unmount.
  </Callout>
</template>
