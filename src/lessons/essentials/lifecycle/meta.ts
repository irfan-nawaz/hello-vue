import type { LessonMeta } from '../../types'

export default {
  title: 'Lifecycle Hooks',
  summary: 'The full parent/child lifecycle order, visualised — plus error capturing and render debugging hooks.',
  order: 13,
  guide: ['Lifecycle Hooks'],
  apis: [
    'onBeforeMount()',
    'onMounted()',
    'onBeforeUpdate()',
    'onUpdated()',
    'onBeforeUnmount()',
    'onUnmounted()',
    'onErrorCaptured()',
    'onRenderTracked()',
    'onRenderTriggered()',
  ],
  docs: 'https://vuejs.org/guide/essentials/lifecycle.html',
} satisfies LessonMeta
