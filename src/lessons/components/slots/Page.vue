<script setup lang="ts">
import { Callout, CodeBlock, Demo } from '@/kit'
</script>

<template>
  <p>
    Slots let a parent pass <b>template content</b> into a child. Slot content has access to the parent's scope —
    and, with <b>scoped slots</b>, to data the child passes back up.
  </p>
  <Demo name="SlotsDemo" title="Every kind of slot" :files="['demos/Card.vue', 'demos/FancyList.vue', 'demos/MouseTracker.vue']" />
  <h2>Syntax summary</h2>
  <CodeBlock code='<Comp>default content</Comp>
<Comp><template #header>…</template></Comp>          <!-- v-slot:header -->
<Comp><template #[name]>…</template></Comp>          <!-- dynamic -->
<Comp v-slot="{ item }">{{ item }}</Comp>            <!-- default scoped slot -->
<Comp><template #item="{ item, index }">…</template></Comp>' />
  <Callout type="tip">
    Under the hood slots are <b>functions</b> the child calls (that's how scope props get passed). Because
    they're lazily called by the child, a child re-renders its slot content when the child updates.
  </Callout>
</template>
