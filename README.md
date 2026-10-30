# Vue Lab — learn Vue by poking it

An interactive Vue 3.5 learning app: **62 lessons** covering every topic of the Vue guide and **every entry of the
API reference** (215 items) plus the ecosystem — Vite, Vitest, Vue Router, Pinia, Pinia Colada, VueUse and shadcn-vue.

Each lesson has live demos with a **Preview | Code** tab (the code shown is the exact file running) and visualizers of
what Vue does internally: dependency tracking, lifecycle order, compiled render functions & patch flags, vnode trees,
query caches and more.

```sh
pnpm install
pnpm dev            # http://localhost:5173
pnpm test:unit      # Vitest: lesson specs + coverage test (every API must be taught)
pnpm test:e2e       # Playwright: visits every lesson, fails on console errors
pnpm build          # type-check + production build
```

## How it's organised

```
src/
  lessons/<section>/<slug>/
    meta.ts         title, summary, guide topics + API entries it covers
    Page.vue        the lesson text
    demos/*.vue     live demos (rendered by <Demo name="…">, source shown in the Code tab)
    routes.ts       optional nested routes (see the Vue Router lesson)
  lessons/registry.ts   import.meta.glob → lesson list → routes, sidebar, search, prev/next
  lessons/api-index.ts  the full guide + API reference checklist
  kit/                  Demo, CodeBlock, EventLog, StateInspector, DepTracker, CompileExplorer, VNodeTree, …
  components/ui/        shadcn-vue components (copied in, owned by this repo)
  stores/               progress store (Pinia + useLocalStorage) and the undo Pinia plugin
```

**Add a lesson:** create `src/lessons/<section>/<slug>/meta.ts` + `Page.vue`. It shows up in the sidebar, search,
routes and the `/coverage` map automatically. `src/lessons/__tests__/coverage.spec.ts` fails if any API entry
in `api-index.ts` isn't claimed by a lesson.

## Notes

- A runtime template compiler is registered in `src/kit/runtimeCompiler.ts` so demos can use the `template` option,
  `compilerOptions` and in-browser SSR. A normal app ships the runtime-only build.
- `onRenderTracked` / `onRenderTriggered` (used by the dependency tracker) only fire in dev builds.
