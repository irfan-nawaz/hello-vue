<script setup lang="ts">
import { EventLog, useEventLog } from '@/kit'

const events = useEventLog()
const log = (msg: string) => events.log(msg, 'event')

// method handler receives the native event
function onOuter(e: MouseEvent) {
  log(`outer div handler (target: <${(e.target as HTMLElement).tagName.toLowerCase()}>)`)
}
// inline handler can pass $event explicitly
function say(msg: string, e?: Event) {
  log(`${msg}${e ? ` (${e.type})` : ''}`)
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack text-sm">
      <div class="box stack" @click="onOuter">
        <span class="label">click bubbling: outer @click logs too</span>
        <div class="row">
          <button @click="say('plain click', $event)">plain</button>
          <button @click.stop="say('.stop — no bubbling')">.stop</button>
          <button @click.once="say('.once — only first time')">.once</button>
          <button @click.right.prevent="say('.right.prevent — no context menu')">right-click</button>
          <button @click.middle="say('.middle')">middle-click</button>
        </div>
        <div class="box" @click.self="say('.self — only when clicking the box itself')">
          .self: click padding here, not the <button @click="say('inner button')">inner button</button>
        </div>
        <div class="box" @click.capture="say('.capture — outer runs FIRST')">
          <button @click="say('…then inner')">.capture order</button>
        </div>
      </div>
      <form class="row" @submit.prevent="say('form submitted (.prevent — no reload)')">
        <input placeholder="press enter" />
        <button>submit</button>
      </form>
      <div class="row">
        <input placeholder="@keyup.enter / .esc / .ctrl.k" @keyup.enter="say('enter')" @keyup.esc="say('esc')" @keydown.ctrl.k.prevent="say('ctrl+k')" />
        <button @click.alt.exact="say('alt+click .exact')">alt+click only</button>
      </div>
      <div class="h-20 overflow-y-scroll rounded border p-2" @scroll.passive="say('scroll (.passive — never blocks scrolling)')">
        <p class="h-40">scroll me…</p>
      </div>
    </div>
    <EventLog :log="events" height="22rem" />
  </div>
</template>
