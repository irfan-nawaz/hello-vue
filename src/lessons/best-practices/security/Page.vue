<script setup lang="ts">
import { Callout, Demo } from '@/kit'
</script>

<template>
  <p>
    <b>Rule #1: never use non-trusted content as your component template.</b> That's equivalent to letting someone run
    JavaScript in your app.
  </p>
  <Demo name="XssDemo" title="What's escaped and what isn't" />
  <table>
    <thead><tr><th>Vue does for you</th><th>You must handle</th></tr></thead>
    <tbody>
      <tr><td>Escapes text interpolation <code v-pre>{{ }}</code></td><td><code>v-html</code> / <code>innerHTML</code> — sanitize (DOMPurify) server-side</td></tr>
      <tr><td>Escapes attribute bindings</td><td>URLs (<code>javascript:</code>) — allow-list protocols, sanitize on the backend</td></tr>
      <tr><td>Uses <code>textContent</code> / <code>setAttribute</code></td><td>Styles from users (clickjacking) — bind only specific properties</td></tr>
      <tr><td></td><td>User-provided JS in event handlers / templates — never</td></tr>
    </tbody>
  </table>
  <Callout type="danger">
    SSR adds risk: rendering user content into HTML or serializing state into a <code>&lt;script&gt;</code> needs escaping
    (e.g. <code>devalue</code>/<code>serialize-javascript</code>) to avoid breaking out of the tag.
  </Callout>
</template>
