import type { LessonMeta } from '../../types'

export default {
  title: 'TypeScript',
  summary: 'Typing props, emits, refs, computed, provide/inject, template refs and events — plus the utility types.',
  order: 4,
  guide: ['TypeScript Overview', 'TS with Composition API'],
  apis: ['ExtractPropTypes<T>', 'ExtractPublicPropTypes<T>', 'useSlots() & useAttrs()'],
  docs: 'https://vuejs.org/guide/typescript/composition-api.html',
} satisfies LessonMeta
