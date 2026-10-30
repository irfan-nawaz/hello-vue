import type { LessonMeta } from '../../types'

export default {
  title: 'Component Instance',
  summary: 'Poke at $data, $props, $el, $options, $parent, $root, $slots, $refs, $attrs and the instance methods.',
  order: 4,
  apis: [
    '$data', '$props', '$el', '$options', '$parent', '$root', '$slots', '$refs', '$attrs',
    '$watch()', '$forceUpdate()', '$nextTick()', '$emit()',
  ],
  docs: 'https://vuejs.org/api/component-instance.html',
} satisfies LessonMeta
