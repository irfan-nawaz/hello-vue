<!-- SFC comments: use HTML comments at the top level, language comments inside blocks -->
<script setup lang="ts">
// <script>: logic. lang="ts" picks the TypeScript loader
const blocks = ['template', 'script', 'script setup', 'style', 'style scoped', 'style module', 'custom blocks']
</script>

<template>
  <!-- <template>: at most one per file; lang="pug" possible with a pre-processor -->
  <div class="from-src stack">
    <p>This style comes from <code>&lt;style src="./SrcImport.css" scoped&gt;</code></p>
    <p class="mono">blocks: {{ blocks.join(' · ') }}</p>
  </div>
</template>

<!-- src import: pull a block's content from another file (relative, alias or npm path) -->
<style src="./SrcImport.css" scoped></style>
