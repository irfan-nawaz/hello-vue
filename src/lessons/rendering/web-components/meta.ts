import type { LessonMeta } from '../../types'

export default {
  title: 'Vue and Web Components',
  summary: 'Ship Vue components as native custom elements with defineCustomElement — shadow DOM, props, events, host access.',
  order: 4,
  guide: ['Vue and Web Components'],
  apis: ['defineCustomElement()', 'useHost()', 'useShadowRoot()', 'this.$host'],
  docs: 'https://vuejs.org/guide/extras/web-components.html',
} satisfies LessonMeta
