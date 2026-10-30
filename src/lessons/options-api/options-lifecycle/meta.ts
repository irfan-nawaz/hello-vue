import type { LessonMeta } from '../../types'

export default {
  title: 'Options: Lifecycle',
  summary: 'All 14 lifecycle options including beforeCreate/created, errorCaptured, render debug hooks and KeepAlive hooks.',
  order: 2,
  apis: [
    'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeUnmount', 'unmounted',
    'errorCaptured', 'renderTracked', 'renderTriggered', 'activated', 'deactivated', 'serverPrefetch',
  ],
  docs: 'https://vuejs.org/api/options-lifecycle.html',
} satisfies LessonMeta
