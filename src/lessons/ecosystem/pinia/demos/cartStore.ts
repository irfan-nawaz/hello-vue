import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type {} from '@/stores/plugins/undo' // brings the plugin's `undo` option typing into scope

export interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

// Setup store: ref() = state, computed() = getters, function = actions
export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<CartItem[]>([])
    const coupon = ref('')

    const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0))
    const total = computed(() => {
      const sum = items.value.reduce((s, i) => s + i.price * i.qty, 0)
      return coupon.value === 'VUE10' ? sum * 0.9 : sum
    })

    function add(product: Omit<CartItem, 'qty'>) {
      const existing = items.value.find((i) => i.id === product.id)
      if (existing) existing.qty++
      else items.value.push({ ...product, qty: 1 })
    }
    async function checkout() {
      await new Promise((r) => setTimeout(r, 600))
      if (total.value > 100) throw new Error('Card declined (total > $100)')
      items.value = []
    }
    // setup stores must implement $reset themselves
    function $reset() {
      items.value = []
      coupon.value = ''
    }

    return { items, coupon, count, total, add, checkout, $reset }
  },
  { undo: true }, // custom option read by our undo plugin
)
