import type { RouteRecordRaw } from 'vue-router'
import { loggedIn } from './demos/auth'

// Nested routes, mounted under /ecosystem/vue-router by the registry (see registry.ts)
export default [
  { path: '', name: 'router-home', component: () => import('./demos/RouterHome.vue') },
  {
    // param with a regex: only digits; `props: true` passes params as component props
    path: 'users/:id(\\d+)',
    name: 'router-user',
    props: true,
    // named views: several components for one route
    components: {
      default: () => import('./demos/UserView.vue'),
      aside: () => import('./demos/UserAside.vue'),
    },
    meta: { title: 'User profile' },
  },
  {
    path: 'admin',
    name: 'router-admin',
    component: () => import('./demos/AdminView.vue'),
    meta: { requiresAuth: true },
    // per-route guard
    beforeEnter: (to) => (loggedIn.value ? true : { name: 'router-login', query: { redirect: to.fullPath } }),
  },
  { path: 'login', name: 'router-login', component: () => import('./demos/LoginView.vue') },
] satisfies RouteRecordRaw[]
