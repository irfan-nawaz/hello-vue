<script setup lang="ts">
import { createApp, defineComponent, h, inject, onBeforeUnmount, ref, useId, useTemplateRef, version, type App, type Plugin } from 'vue'
import { EventLog, useEventLog } from '@/kit'

const host = useTemplateRef<HTMLDivElement>('host')
const mounted = ref(false)
const { log, ...rest } = useEventLog()
const events = { log, ...rest }
let app: App | undefined

// A tiny plugin: everything an app-level plugin can do
const greeterPlugin: Plugin<{ greeting: string }> = {
  install(app, options) {
    log(`app.use(): plugin installed with ${JSON.stringify(options)}`, 'success')
    app.provide('greeting', options.greeting)
    app.config.globalProperties.$shout = (s: string) => s.toUpperCase() + '!'
  },
}

// The root component uses a *string template* with custom [[ ]] delimiters —
// compiled at runtime using app.config.compilerOptions
const Root = defineComponent({
  props: { title: String },
  setup() {
    const greeting = inject<string>('greeting')
    const id = useId() // prefixed with app.config.idPrefix
    const count = ref(0)
    const explode = () => {
      throw new Error('Boom from a click handler')
    }
    return { greeting, id, count, explode }
  },
  // custom option merged by optionMergeStrategies (see below)
  tags: ['root'],
  template: `
    <div class="stack">
      <p><b>[[ title ]]</b> — injected greeting: <i>[[ greeting ]]</i></p>
      <p>globalProperties: [[ $shout('hello') ]] · useId(): <code>[[ id ]]</code></p>
      <p>merged custom option: <code>[[ $options.tags ]]</code></p>
      <div class="row">
        <GlobalBadge :n="count" />
        <button v-highlight @click="count++">count++ (v-highlight)</button>
        <button @click="explode">throw error</button>
        <button @click="count = undefinedThing">trigger warning</button>
      </div>
    </div>`,
})

function mount() {
  app = createApp(Root, { title: 'Hello from root props' })

  app.config.compilerOptions.delimiters = ['[[', ']]']
  app.config.idPrefix = 'sandbox'
  app.config.performance = true // shows component timings in the browser Performance panel
  app.config.errorHandler = (err, _instance, info) =>
    log(`errorHandler caught: ${(err as Error).message}`, 'error', info)
  app.config.warnHandler = (msg) => log(`warnHandler: ${msg}`, 'warn')
  app.config.optionMergeStrategies.tags = (parent, child) => [
    ...((parent as string[] | undefined) ?? []),
    ...((child as string[] | undefined) ?? []),
  ]

  app.mixin({
    tags: ['global-mixin'],
    created(this: { $options: { name?: string; __name?: string } }) {
      log(`app.mixin(): created hook ran for ${this.$options.name ?? 'Root'}`, 'hook')
    },
  })
  app.component(
    'GlobalBadge',
    defineComponent({
      name: 'GlobalBadge',
      props: { n: Number },
      setup: (props) => () =>
        h('span', { class: 'rounded-full bg-vue px-2 text-sm text-white' }, `global component · ${props.n}`),
    }),
  )
  app.directive('highlight', {
    mounted: (el: HTMLElement) => (el.style.outline = '2px dashed var(--color-vue)'),
  })
  app.use(greeterPlugin, { greeting: 'Hi from a plugin 👋' })
  app.onUnmount(() => log('app.onUnmount(): cleanup callback ran', 'warn'))

  // runWithContext: call inject() outside of any component, using this app's context
  const viaContext = app.runWithContext(() => inject('greeting'))
  log(`app.runWithContext(() => inject('greeting')) → ${viaContext}`, 'info')

  app.mount(host.value!)
  mounted.value = true
  log(`app.mount() — Vue ${app.version}`, 'success')
}

function unmount() {
  app?.unmount()
  app = undefined
  mounted.value = false
  log('app.unmount()', 'error')
}

onBeforeUnmount(() => app?.unmount())
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <div class="row">
        <button :disabled="mounted" @click="mount">createApp() + mount()</button>
        <button :disabled="!mounted" @click="unmount">app.unmount()</button>
        <span class="mono text-muted-foreground">version: {{ version }}</span>
      </div>
      <div ref="host" class="box min-h-32 border-dashed">
        <p v-if="!mounted" class="text-sm text-muted-foreground italic">
          An isolated second Vue app mounts here.
        </p>
      </div>
    </div>
    <EventLog :log="events" title="app lifecycle & handlers" />
  </div>
</template>
