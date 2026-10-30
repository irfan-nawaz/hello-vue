import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useCounter } from '../demos/useCounter'

// Composables without lifecycle hooks can be tested as plain functions
describe('useCounter', () => {
  it('increments', () => {
    const { count, inc } = useCounter(1)
    inc()
    expect(count.value).toBe(2)
  })

  it('respects a reactive max', () => {
    const max = ref(2)
    const { count, inc, atMax } = useCounter(0, max)
    inc()
    inc()
    inc()
    expect(count.value).toBe(2)
    expect(atMax.value).toBe(true)
    max.value = 5
    expect(atMax.value).toBe(false)
  })
})
