import type { LessonMeta } from '../../types'

export default {
  title: 'Rendering Mechanism',
  summary: 'Template → render function → VNodes → DOM. Explore patch flags, static caching and the block tree live.',
  order: 1,
  guide: ['Rendering Mechanism'],
  apis: ['app.config.compilerOptions', 'option: compilerOptions', 'option: template'],
  docs: 'https://vuejs.org/guide/extras/rendering-mechanism.html',
} satisfies LessonMeta
