import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { lessons } from '@/lessons/registry'
import type { Lesson } from '@/lessons/types'

declare module 'vue-router' {
  interface RouteMeta {
    lesson?: Lesson
    /** Used by the Vue Router lesson to show route meta + guards */
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/coverage',
      name: 'coverage',
      component: () => import('../views/CoverageView.vue'),
    },
    // One lazy route per lesson, generated from the registry
    ...lessons.map((lesson) => ({
      path: lesson.path,
      name: `${lesson.section}/${lesson.slug}`,
      component: lesson.load,
      meta: { lesson },
      children: lesson.children,
    })),
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    // Nested demo routes inside a lesson should not jump to the top
    if (to.matched[0]?.path === from.matched[0]?.path) return false
    return { top: 0 }
  },
})

// Accessibility: SPA navigations don't reload the page, so keep the document title in sync
router.afterEach((to) => {
  const lesson = to.matched[0]?.meta.lesson
  document.title = lesson ? `${lesson.title} · Vue Lab` : 'Vue Lab — learn Vue by poking it'
})

export default router
