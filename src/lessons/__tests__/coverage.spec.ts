import { describe, expect, it } from 'vitest'
import { allApis, allGuide } from '../api-index'
import { apiCoverage, guideCoverage } from '../coverage'
import { lessons } from '../registry'

describe('lesson registry', () => {
  it('has unique paths', () => {
    const paths = lessons.map((l) => l.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('index entries are unique', () => {
    expect(new Set(allApis).size).toBe(allApis.length)
    expect(new Set(allGuide).size).toBe(allGuide.length)
  })

  it('lesson metadata only uses known names (no typos)', () => {
    expect(apiCoverage.unknown).toEqual([])
    expect(guideCoverage.unknown).toEqual([])
  })
})

describe('coverage', () => {
  const missing = (c: typeof apiCoverage) =>
    c.groups.flatMap((g) => g.items.filter((i) => !i.lessons.length).map((i) => `${g.group} › ${i.name}`))

  it('every guide topic is taught by a lesson', () => {
    expect(missing(guideCoverage)).toEqual([])
  })

  it('every API reference entry is demonstrated by a lesson', () => {
    expect(missing(apiCoverage)).toEqual([])
  })
})
