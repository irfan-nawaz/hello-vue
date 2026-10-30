<script setup lang="ts">
import { Demo } from '@/kit'
</script>

<template>
  <p>
    These look like elements/attributes but are compiler features — they never end up in the DOM as such.
  </p>
  <Demo name="SpecialDemo" title="&lt;component&gt;, &lt;template&gt;, key" />
  <table>
    <tbody>
      <tr><td><code>&lt;component :is&gt;</code></td><td>dynamic components or elements</td></tr>
      <tr><td><code>&lt;slot&gt;</code></td><td>slot outlet — see <RouterLink to="/components/slots">Slots</RouterLink></td></tr>
      <tr><td><code>&lt;template&gt;</code></td><td>invisible wrapper for <code>v-if</code>, <code>v-for</code>, <code>v-slot</code></td></tr>
      <tr><td><code>key</code></td><td>identity hint for the diff — see <RouterLink to="/essentials/list">List Rendering</RouterLink></td></tr>
      <tr><td><code>ref</code></td><td>template refs — see <RouterLink to="/essentials/template-refs">Template Refs</RouterLink></td></tr>
      <tr><td><code>is</code></td><td>dynamic component binding; <code>vue:</code> prefix for in-DOM templates</td></tr>
    </tbody>
  </table>
</template>
