import { apiIndex, guideIndex, type IndexGroup } from './api-index'
import { lessons } from './registry'
import type { Lesson } from './types'

export interface CoverageItem {
  name: string
  lessons: Lesson[]
}

function build(index: IndexGroup[], field: 'apis' | 'guide') {
  const claimedBy = new Map<string, Lesson[]>()
  for (const lesson of lessons) {
    for (const name of lesson[field] ?? []) {
      claimedBy.set(name, [...(claimedBy.get(name) ?? []), lesson])
    }
  }
  const known = new Set(index.flatMap((g) => g.items))
  return {
    groups: index.map((g) => ({
      group: g.group,
      items: g.items.map<CoverageItem>((name) => ({ name, lessons: claimedBy.get(name) ?? [] })),
    })),
    /** names used in a meta.ts that don't exist in the index (typos) */
    unknown: [...claimedBy.keys()].filter((k) => !known.has(k)),
  }
}

export const guideCoverage = build(guideIndex, 'guide')
export const apiCoverage = build(apiIndex, 'apis')
