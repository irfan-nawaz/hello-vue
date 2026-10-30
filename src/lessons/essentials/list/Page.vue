<script setup lang="ts">
import { Callout, CompileExplorer, Demo } from '@/kit'
</script>

<template>
  <Demo name="VForForms" title="Every v-for shape" />
  <h2>Mutation methods vs replacing</h2>
  <p>
    Vue wraps the array mutation methods (<code>push pop shift unshift splice sort reverse</code>) so they trigger
    updates. Non-mutating ones (<code>filter concat slice map</code>) return new arrays — just assign them back;
    Vue reuses DOM efficiently.
  </p>
  <h2>Why keys matter</h2>
  <Demo name="WhyKeys" title="Unkeyed vs keyed lists">
    <p>Without keys, Vue patches elements in place by position, so the typed (un-bound) input values stay put
      while the names move. With keys the whole row moves.</p>
  </Demo>
  <Callout type="tip">Use stable unique ids as keys — never the index if the list can reorder.</Callout>
  <h2>Compiler view</h2>
  <p>Note <code>KEYED_FRAGMENT</code> vs <code>UNKEYED_FRAGMENT</code> — the runtime picks a different diff algorithm:</p>
  <CompileExplorer template='<li v-for="item in items" :key="item.id">{{ item.text }}</li>
<li v-for="item in items">{{ item.text }}</li>' height="6rem" />
</template>
