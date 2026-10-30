// Mirrors of Vue's internal bit flags (from @vue/shared) so the visualizers can decode them.

export const PatchFlags: Record<number, string> = {
  1: 'TEXT',
  2: 'CLASS',
  4: 'STYLE',
  8: 'PROPS',
  16: 'FULL_PROPS',
  32: 'NEED_HYDRATION',
  64: 'STABLE_FRAGMENT',
  128: 'KEYED_FRAGMENT',
  256: 'UNKEYED_FRAGMENT',
  512: 'NEED_PATCH',
  1024: 'DYNAMIC_SLOTS',
  2048: 'DEV_ROOT_FRAGMENT',
}

export const PatchFlagHelp: Record<string, string> = {
  TEXT: 'only text content is dynamic — diff skips props entirely',
  CLASS: 'only the class binding is dynamic',
  STYLE: 'only the style binding is dynamic',
  PROPS: 'listed props are dynamic (the 5th arg names them)',
  FULL_PROPS: 'dynamic keys (v-bind="obj" / :[key]) — full props diff',
  NEED_HYDRATION: 'has event listeners that must be attached during hydration',
  STABLE_FRAGMENT: 'fragment whose children order never changes',
  KEYED_FRAGMENT: 'v-for with keys — keyed diff',
  UNKEYED_FRAGMENT: 'v-for without keys — patched by index',
  NEED_PATCH: 'non-prop patch needed (ref, directives)',
  DYNAMIC_SLOTS: 'slots that depend on v-if/v-for — always re-render children',
  CACHED: 'static node — created once and reused forever (cacheStatic / hoisting)',
  BAIL: 'bail out of optimised mode',
  HOISTED: 'static node hoisted out of the render function',
}

export const ShapeFlags: Record<number, string> = {
  1: 'ELEMENT',
  2: 'FUNCTIONAL_COMPONENT',
  4: 'STATEFUL_COMPONENT',
  8: 'TEXT_CHILDREN',
  16: 'ARRAY_CHILDREN',
  32: 'SLOTS_CHILDREN',
  64: 'TELEPORT',
  128: 'SUSPENSE',
  256: 'COMPONENT_SHOULD_KEEP_ALIVE',
  512: 'COMPONENT_KEPT_ALIVE',
}

export function decode(flags: number, table: Record<number, string>) {
  if (flags === -1) return ['CACHED']
  if (flags === -2) return ['BAIL']
  return Object.entries(table)
    .filter(([bit]) => flags & Number(bit))
    .map(([, name]) => name)
}
