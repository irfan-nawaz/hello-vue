import type { LessonMeta } from '../../types'

export default {
  title: 'Options: Composition & Misc',
  summary: 'provide/inject options, mixins (and their problems), extends, name, inheritAttrs, local components & directives.',
  order: 3,
  apis: [
    'option: provide', 'option: inject', 'option: mixins', 'option: extends', 'option: name',
    'option: inheritAttrs', 'option: directives', 'app.mixin()',
  ],
  docs: 'https://vuejs.org/api/options-composition.html',
} satisfies LessonMeta
