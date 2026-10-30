<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>v-if</code> is <b>real</b> conditional rendering: the block is destroyed and re-created (components
    unmount and lose state). <code>v-show</code> always renders and only toggles <code>display: none</code>.
  </p>
  <Demo name="IfVsShow" title="v-if chain vs v-show, with the live DOM">
    <p>Drag the grade across 70/90: each branch mounts/unmounts. Toggle visible: v-show never unmounts.</p>
  </Demo>
  <table>
    <thead><tr><th></th><th>v-if</th><th>v-show</th></tr></thead>
    <tbody>
      <tr><td>Initial cost</td><td>lazy — nothing rendered if false</td><td>always renders</td></tr>
      <tr><td>Toggle cost</td><td>high (create/destroy)</td><td>cheap (CSS)</td></tr>
      <tr><td>Works on &lt;template&gt;</td><td>yes</td><td>no</td></tr>
      <tr><td>Supports v-else</td><td>yes</td><td>no</td></tr>
    </tbody>
  </table>
  <Callout type="warn">
    When <code>v-if</code> and <code>v-for</code> are on the same element, <code>v-if</code> runs first (and can't see the
    loop variable). Wrap with <code>&lt;template v-for&gt;</code> instead — see List Rendering.
  </Callout>
</template>
