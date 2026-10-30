// Type augmentation for things plugins add globally (see the Plugins lesson).
// These interfaces exist exactly so libraries/apps can extend Vue's types.
export {}

declare module 'vue' {
  /** `this.$shout` / `$shout` in templates — added via app.config.globalProperties */
  interface ComponentCustomProperties {
    $shout: (s: string) => string
    $t: (key: string) => string
  }
  /** Custom component options, e.g. `tags: [...]` merged by optionMergeStrategies */
  interface ComponentCustomOptions {
    tags?: string[]
  }
  /** Props accepted by every component, e.g. a global `data-testid` */
  interface ComponentCustomProps {
    'data-testid'?: string
  }
}
