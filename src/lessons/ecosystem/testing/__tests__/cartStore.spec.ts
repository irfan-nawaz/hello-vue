import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../../pinia/demos/cartStore'

describe('cart store', () => {
  // fresh pinia per test → no state leaks between tests
  beforeEach(() => setActivePinia(createPinia()))

  it('adds items and computes the total with a coupon', () => {
    const cart = useCartStore()
    cart.add({ id: 1, name: 'mug', price: 10 })
    cart.add({ id: 1, name: 'mug', price: 10 })
    expect(cart.count).toBe(2)
    cart.coupon = 'VUE10'
    expect(cart.total).toBe(18)
  })

  it('checkout clears the cart (fake timers for the async action)', async () => {
    vi.useFakeTimers()
    const cart = useCartStore()
    cart.add({ id: 2, name: 'plush', price: 25 })
    const done = cart.checkout()
    await vi.advanceTimersByTimeAsync(600)
    await done
    expect(cart.items).toHaveLength(0)
    vi.useRealTimers()
  })
})
