<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <Demo name="A11yDemo" title="Accessible form & controls" />
  <h2>SPA-specific concerns</h2>
  <CodeBlock lang="ts" code="// Route changes don't reload the page, so announce them / move focus yourself
router.afterEach(async (to) => {
  await nextTick()
  document.querySelector<HTMLElement>('main h1')?.focus()   // h1 with tabindex=&quot;-1&quot;
  document.title = `${to.meta.title} · My App`
})" />
  <ul>
    <li><b>Skip link</b> as the first focusable element: <code>&lt;a href="#main" class="sr-only focus:not-sr-only"&gt;Skip to content&lt;/a&gt;</code>.</li>
    <li><b>Semantic HTML</b> first (<code>button</code>, <code>nav</code>, <code>main</code>, headings in order), ARIA only to fill gaps.</li>
    <li><b>Headless libraries</b> like Reka UI (behind shadcn-vue here) implement the WAI-ARIA patterns for dialogs, menus, selects.</li>
    <li>Respect <code>prefers-reduced-motion</code> and keep sufficient colour contrast.</li>
  </ul>
  <Callout type="tip">Try the ⌘K search dialog of this lab with only a keyboard: focus is trapped and restored — that's Reka UI.</Callout>
</template>
