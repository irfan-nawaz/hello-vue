import type { LessonMeta } from '../../types'

export default {
  title: 'Provide / Inject',
  summary: 'Skip prop drilling: reactive provide, Symbol keys with InjectionKey, defaults, readonly, app-level provide.',
  order: 7,
  guide: ['Provide / inject'],
  apis: ['provide()', 'inject()', 'hasInjectionContext()'],
  docs: 'https://vuejs.org/guide/components/provide-inject.html',
} satisfies LessonMeta
