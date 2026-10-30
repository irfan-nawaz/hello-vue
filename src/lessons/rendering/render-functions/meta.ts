import type { LessonMeta } from '../../types'

export default {
  title: 'Render Functions & JSX',
  summary: 'Write vnodes by hand with h(): setup-returned render fns, functional components, slots, directives & helpers.',
  order: 2,
  guide: ['Render Functions & JSX'],
  apis: [
    'h()', 'mergeProps()', 'cloneVNode()', 'isVNode()', 'resolveComponent()', 'withModifiers()',
    'option: render', 'setup: Usage with Render Functions', 'setup()', 'setup: Basic Usage',
  ],
  docs: 'https://vuejs.org/guide/extras/render-function.html',
} satisfies LessonMeta
