import { isRef, toRaw } from 'vue'

/** JSON-ish pretty printer that understands refs, Map, Set, functions and cycles */
export function serialize(value: unknown, indent = 2): string {
  const seen = new WeakSet<object>()
  const walk = (v: unknown): unknown => {
    if (isRef(v)) return { '<ref>': walk(v.value) }
    if (typeof v === 'function') return `ƒ ${v.name || 'anonymous'}()`
    if (typeof v === 'symbol' || typeof v === 'bigint') return v.toString()
    if (v === undefined) return 'undefined'
    if (v === null || typeof v !== 'object') return v
    const raw = toRaw(v)
    if (seen.has(raw)) return '[Circular]'
    seen.add(raw)
    // read through the proxy (v) so a reactive inspector tracks every key
    if (v instanceof Map) return { '<Map>': Object.fromEntries([...v].map(([k, x]) => [String(k), walk(x)])) }
    if (v instanceof Set) return { '<Set>': [...v].map(walk) }
    if (v instanceof Date) return v.toISOString()
    if (v instanceof Element) return `<${v.tagName.toLowerCase()}>`
    if (Array.isArray(v)) return v.map(walk)
    return Object.fromEntries(Object.keys(v).map((k) => [k, walk((v as Record<string, unknown>)[k])]))
  }
  return JSON.stringify(walk(value), null, indent)
}
