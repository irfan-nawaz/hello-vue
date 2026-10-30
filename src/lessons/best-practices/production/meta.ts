import type { LessonMeta } from '../../types'

export default {
  title: 'Production Deployment',
  summary: 'Dev vs prod builds, compile-time feature flags, error tracking and what `pnpm build` produces.',
  order: 4,
  guide: ['Production Deployment'],
  apis: [
    '__VUE_OPTIONS_API__', '__VUE_PROD_DEVTOOLS__', '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__', 'Configuration Guides',
    'app.config.errorHandler',
  ],
  docs: 'https://vuejs.org/guide/best-practices/production-deployment.html',
} satisfies LessonMeta
