import { defineStore } from 'pinia'

// Options store: state / getters / actions — like the Options API
export const usePrefsStore = defineStore('prefs', {
  state: () => ({ currency: 'USD' as 'USD' | 'EUR' | 'INR', compact: false }),
  getters: {
    symbol: (state) => ({ USD: '$', EUR: '€', INR: '₹' })[state.currency],
  },
  actions: {
    toggleCompact() {
      this.compact = !this.compact
    },
  },
})
