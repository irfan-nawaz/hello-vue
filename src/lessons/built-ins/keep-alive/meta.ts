import type { LessonMeta } from '../../types'

export default {
  title: 'KeepAlive',
  summary: 'Cache component instances when switching: include/exclude/max (LRU) and activated/deactivated hooks.',
  order: 3,
  guide: ['KeepAlive'],
  apis: ['<KeepAlive>', 'onActivated()', 'onDeactivated()'],
  docs: 'https://vuejs.org/guide/built-ins/keep-alive.html',
} satisfies LessonMeta
