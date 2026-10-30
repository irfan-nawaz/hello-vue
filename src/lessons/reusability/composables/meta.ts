import type { LessonMeta } from '../../types'

export default {
  title: 'Composables',
  summary: 'Extract stateful logic into use* functions: conventions, toValue inputs, cleanup, and VueUse.',
  order: 1,
  guide: ['Composables'],
  apis: ['toValue()', 'MaybeRefOrGetter<T>', 'MaybeRef<T>'],
  docs: 'https://vuejs.org/guide/reusability/composables.html',
} satisfies LessonMeta
