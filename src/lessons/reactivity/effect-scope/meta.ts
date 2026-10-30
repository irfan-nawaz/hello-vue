import type { LessonMeta } from '../../types'

export default {
  title: 'Effect Scopes',
  summary: 'Group computed/watchers and dispose them together — the primitive behind composables and Pinia stores.',
  order: 3,
  apis: ['effectScope()', 'getCurrentScope()', 'onScopeDispose()'],
  docs: 'https://vuejs.org/api/reactivity-advanced.html#effectscope',
} satisfies LessonMeta
