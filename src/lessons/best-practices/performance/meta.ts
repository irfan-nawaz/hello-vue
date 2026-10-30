import type { LessonMeta } from '../../types'

export default {
  title: 'Performance',
  summary: 'Measure re-renders: props stability, v-memo, v-once, computed stability, shallowRef and list virtualisation.',
  order: 1,
  guide: ['Performance'],
  apis: ['v-memo', 'v-once', 'app.config.performance'],
  docs: 'https://vuejs.org/guide/best-practices/performance.html',
} satisfies LessonMeta
