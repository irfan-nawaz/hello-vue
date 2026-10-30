import type { LessonMeta } from '../../types'

export default {
  title: 'Watchers',
  summary: 'watch vs watchEffect, sources, deep/immediate/once, flush timing, cleanup and stopping.',
  order: 10,
  guide: ['Watchers'],
  apis: ['watch()', 'watchEffect()', 'watchPostEffect()', 'watchSyncEffect()', 'onWatcherCleanup()'],
  docs: 'https://vuejs.org/guide/essentials/watchers.html',
} satisfies LessonMeta
