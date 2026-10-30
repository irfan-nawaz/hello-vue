import type { LessonMeta } from '../../types'

export default {
  title: 'Advanced Reactivity APIs',
  summary: 'Opt out of deep reactivity for performance: shallowRef + triggerRef, shallowReactive/Readonly, toRaw, markRaw, customRef.',
  order: 2,
  apis: ['shallowRef()', 'triggerRef()', 'customRef()', 'shallowReactive()', 'shallowReadonly()', 'toRaw()', 'markRaw()'],
  docs: 'https://vuejs.org/api/reactivity-advanced.html',
} satisfies LessonMeta
