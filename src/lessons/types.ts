import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

/** Default export of every `src/lessons/<section>/<slug>/meta.ts` */
export interface LessonMeta {
  title: string
  summary: string
  /** Sort order inside its section */
  order: number
  /** Guide topics this lesson teaches (must match `guideIndex` in api-index.ts) */
  guide?: string[]
  /** API reference entries this lesson demonstrates (must match `apiIndex` in api-index.ts) */
  apis?: string[]
  /** Link to the official docs */
  docs?: string
}

export interface Lesson extends LessonMeta {
  section: string
  slug: string
  /** Route path, e.g. `/essentials/watchers` */
  path: string
  load: () => Promise<Component>
  /** Optional nested routes from `routes.ts` next to the lesson */
  children: RouteRecordRaw[]
}

export interface Section {
  id: string
  title: string
  icon: string
}
