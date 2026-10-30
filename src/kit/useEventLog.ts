import { shallowRef, triggerRef } from 'vue'

export type LogKind = 'info' | 'success' | 'warn' | 'error' | 'hook' | 'event' | 'effect'

export interface LogEntry {
  id: number
  /** ms since the log was created */
  t: number
  msg: string
  kind: LogKind
  detail?: string
}

/**
 * A timestamped log stream for demos.
 * Pass the whole object to <EventLog :log="log" /> — NOT `log.entries` — so the
 * component that writes to the log never depends on it (no render loops).
 */
export function useEventLog(max = 80) {
  const entries = shallowRef<LogEntry[]>([])
  const start = performance.now()
  let id = 0

  function log(msg: string, kind: LogKind = 'info', detail?: unknown) {
    entries.value.unshift({
      id: id++,
      t: Math.round(performance.now() - start),
      msg,
      kind,
      detail: detail === undefined ? undefined : stringify(detail),
    })
    if (entries.value.length > max) entries.value.length = max
    triggerRef(entries)
  }

  function clear() {
    entries.value = []
  }

  return { entries, log, clear }
}

export type EventLogApi = ReturnType<typeof useEventLog>

function stringify(v: unknown) {
  if (typeof v === 'string') return v
  try {
    return JSON.stringify(v)
  } catch {
    return String(v)
  }
}
