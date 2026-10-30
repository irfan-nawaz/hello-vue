import type { LessonMeta } from '../../types'

export default {
  title: 'Reactivity Utilities',
  summary: 'A live truth table for isRef / isReactive / isReadonly / isShallow / isProxy, and unref / toRef / toRefs / toValue.',
  order: 1,
  apis: ['isRef()', 'unref()', 'toRef()', 'toValue()', 'toRefs()', 'isProxy()', 'isReactive()', 'isReadonly()', 'isShallow()', 'readonly()'],
  docs: 'https://vuejs.org/api/reactivity-utilities.html',
} satisfies LessonMeta
