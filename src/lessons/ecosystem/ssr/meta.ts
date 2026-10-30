import type { LessonMeta } from '../../types'

export default {
  title: 'Server-Side Rendering',
  summary: 'Render to HTML strings & streams, hydrate it, cause (and allow) mismatches, ssrContext and serverPrefetch — in-browser.',
  order: 8,
  guide: ['Server-Side Rendering (SSR)'],
  apis: [
    'createSSRApp()', 'renderToString()', 'renderToWebStream()', 'pipeToWebWritable()', 'renderToSimpleStream()',
    'renderToNodeStream()', 'pipeToNodeWritable()', 'useSSRContext()', 'onServerPrefetch()', 'data-allow-mismatch',
  ],
  docs: 'https://vuejs.org/guide/scaling-up/ssr.html',
} satisfies LessonMeta
