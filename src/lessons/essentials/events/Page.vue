<script setup lang="ts">
import { CodeBlock, CompileExplorer, Demo } from '@/kit'
</script>

<template>
  <p>
    <code>v-on:click</code> (shorthand <code>@click</code>) attaches listeners. The value can be a <b>method name</b>
    (receives the event), or an <b>inline statement</b> (use <code>$event</code> for the event).
  </p>
  <Demo name="Modifiers" title="Modifier playground" />
  <table>
    <tbody>
      <tr><td>Event</td><td><code>.stop .prevent .self .capture .once .passive</code></td></tr>
      <tr><td>Key</td><td><code>.enter .tab .delete .esc .space .up .down .left .right</code>, any <code>KeyboardEvent.key</code> in kebab-case (<code>.page-down</code>)</td></tr>
      <tr><td>System</td><td><code>.ctrl .alt .shift .meta</code> + <code>.exact</code></td></tr>
      <tr><td>Mouse</td><td><code>.left .right .middle</code></td></tr>
    </tbody>
  </table>
  <h2>Modifiers compile to withModifiers()</h2>
  <CompileExplorer template='<button @click.stop.prevent="go">go</button>
<input @keyup.enter="send" />' height="5rem" />
  <p>In render functions you call the same helpers yourself:</p>
  <CodeBlock lang="ts" code="import { h, withModifiers, withKeys } from 'vue'
h('button', { onClick: withModifiers(go, ['stop', 'prevent']) })
h('input', { onKeyup: withKeys(send, ['enter']) })" />
</template>
