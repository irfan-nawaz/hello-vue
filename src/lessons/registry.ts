import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { sections } from './sections'
import type { Lesson, LessonMeta } from './types'

// Vite's import.meta.glob turns the folder structure into the lesson list:
// metadata is bundled eagerly, pages are lazy chunks (one per lesson).
const metas = import.meta.glob<LessonMeta>('./*/*/meta.ts', { eager: true, import: 'default' })
const pages = import.meta.glob<Component>('./*/*/Page.vue', { import: 'default' })
const childRoutes = import.meta.glob<RouteRecordRaw[]>('./*/*/routes.ts', {
  eager: true,
  import: 'default',
})

const sectionOrder = new Map(sections.map((s, i) => [s.id, i]))

export const lessons: Lesson[] = Object.entries(metas)
  .map(([file, meta]) => {
    const [, section = '', slug = ''] = file.split('/')
    const dir = `./${section}/${slug}`
    const load = pages[`${dir}/Page.vue`]
    if (!load) throw new Error(`Lesson ${dir} is missing Page.vue`)
    return {
      ...meta,
      section,
      slug,
      path: `/${section}/${slug}`,
      load,
      children: childRoutes[`${dir}/routes.ts`] ?? [],
    }
  })
  .sort(
    (a, b) =>
      (sectionOrder.get(a.section) ?? 99) - (sectionOrder.get(b.section) ?? 99) ||
      a.order - b.order,
  )

export const lessonsBySection = sections.map((section) => ({
  ...section,
  lessons: lessons.filter((l) => l.section === section.id),
}))

export function findLesson(section: string, slug: string) {
  return lessons.find((l) => l.section === section && l.slug === slug)
}

export function neighbours(lesson: Lesson) {
  const i = lessons.indexOf(lesson)
  return { prev: lessons[i - 1], next: lessons[i + 1] }
}
