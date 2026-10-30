import {
  isRef,
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUpdated,
  shallowRef,
  toRaw,
  type DebuggerEvent,
} from 'vue'

export interface TriggerRecord {
  id: number
  dep: string
  type: string
  oldValue?: string
  newValue?: string
}

/**
 * Visualises Vue's dependency tracking for the calling component:
 * which reactive keys the last render read (onRenderTracked) and
 * which mutation caused a re-render (onRenderTriggered). Dev-only hooks.
 *
 * @param names label reactive sources, e.g. `{ count, state }`
 */
export function useDepTracker(names: Record<string, unknown> = {}) {
  const labels = new Map<unknown, string>()
  for (const [name, source] of Object.entries(names)) labels.set(toRaw(source), name)

  const tracked = shallowRef<string[]>([])
  const triggers = shallowRef<TriggerRecord[]>([])
  const renders = shallowRef(0)
  let current = new Set<string>()
  let id = 0

  const label = (e: DebuggerEvent) => {
    const name = labels.get(e.target) ?? (isRef(e.target) ? 'ref' : shortType(e.target))
    return isRef(e.target) || e.key === 'value' ? `${name}.value` : `${name}.${String(e.key)}`
  }

  const reset = () => (current = new Set())
  const flush = () => {
    renders.value++
    tracked.value = [...current]
  }

  onBeforeMount(reset)
  onBeforeUpdate(reset)
  onMounted(flush)
  onUpdated(flush)
  onRenderTracked((e) => current.add(`${e.type} ${label(e)}`))
  onRenderTriggered((e) => {
    triggers.value = [
      {
        id: id++,
        dep: label(e),
        type: e.type,
        oldValue: preview(e.oldValue),
        newValue: preview(e.newValue),
      },
      ...triggers.value,
    ].slice(0, 12)
  })

  return { tracked, triggers, renders }
}

export type DepTrackerApi = ReturnType<typeof useDepTracker>

function shortType(t: unknown) {
  if (Array.isArray(t)) return 'array'
  if (t instanceof Map) return 'map'
  if (t instanceof Set) return 'set'
  return 'object'
}

function preview(v: unknown) {
  if (v === undefined) return undefined
  try {
    const s = JSON.stringify(v)
    return s.length > 40 ? s.slice(0, 40) + '…' : s
  } catch {
    return String(v)
  }
}
