import type { LessonMeta } from '../../types'

export default {
  title: 'Plugins',
  summary: 'Write an i18n plugin: install(), global properties, provide, components and type augmentation.',
  order: 3,
  guide: ['Plugins'],
  apis: ['app.use()', 'ComponentCustomProperties', 'ComponentCustomOptions', 'ComponentCustomProps'],
  docs: 'https://vuejs.org/guide/reusability/plugins.html',
} satisfies LessonMeta
