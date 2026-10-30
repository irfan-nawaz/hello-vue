// A minimal version of @vue/reactivity — the same core idea, none of the optimisations.

type Effect = { name: string; run: () => void }
type Listener = (event: string) => void

let activeEffect: Effect | undefined
// target → key → set of effects that read it
export const targetMap = new WeakMap<object, Map<PropertyKey, Set<Effect>>>()
// keep strong refs to targets only for visualisation
export const targets = new Map<object, string>()
let listener: Listener = () => {}
export const onEvent = (l: Listener) => (listener = l)

function track(target: object, key: PropertyKey) {
  if (!activeEffect) return // reads outside an effect are not tracked
  let deps = targetMap.get(target)
  if (!deps) targetMap.set(target, (deps = new Map()))
  let effects = deps.get(key)
  if (!effects) deps.set(key, (effects = new Set()))
  if (!effects.has(activeEffect)) listener(`track  ${targets.get(target)}.${String(key)} ← ${activeEffect.name}`)
  effects.add(activeEffect)
}

function trigger(target: object, key: PropertyKey) {
  const effects = targetMap.get(target)?.get(key)
  listener(`trigger ${targets.get(target)}.${String(key)} → [${[...(effects ?? [])].map((e) => e.name).join(', ')}]`)
  // copy: effects re-track while running
  new Set(effects).forEach((e) => e.run())
}

export function reactive<T extends object>(target: T, name: string): T {
  targets.set(target, name)
  return new Proxy(target, {
    get(obj, key, receiver) {
      track(obj, key)
      return Reflect.get(obj, key, receiver)
    },
    set(obj, key, value, receiver) {
      const old = Reflect.get(obj, key, receiver)
      const result = Reflect.set(obj, key, value, receiver)
      if (old !== value) trigger(obj, key)
      return result
    },
  })
}

export function effect(name: string, fn: () => void) {
  const e: Effect = {
    name,
    run() {
      const prev = activeEffect
      activeEffect = e
      try {
        fn()
      } finally {
        activeEffect = prev
      }
    },
  }
  e.run()
  return e
}
