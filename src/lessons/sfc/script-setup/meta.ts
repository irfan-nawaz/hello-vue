import type { LessonMeta } from '../../types'

export default {
  title: '<script setup>',
  summary: 'The recommended SFC syntax: compiler macros, generics, normal <script> alongside, and its restrictions.',
  order: 1,
  apis: [
    'script setup: Basic Syntax', 'defineOptions()', 'defineSlots()', 'useSlots()', 'Usage alongside normal <script>',
    'Import Statements', 'Generics', 'script setup: Restrictions', 'defineProps() & defineEmits()', 'defineModel()', 'defineExpose()',
  ],
  docs: 'https://vuejs.org/api/sfc-script-setup.html',
} satisfies LessonMeta
