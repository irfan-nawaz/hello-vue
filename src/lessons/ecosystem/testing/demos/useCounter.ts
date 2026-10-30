import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'

export function useCounter(initial = 0, max: MaybeRefOrGetter<number> = Infinity) {
  const count = ref(initial)
  const atMax = computed(() => count.value >= toValue(max))
  const inc = () => {
    if (!atMax.value) count.value++
  }
  const reset = () => (count.value = initial)
  return { count, atMax, inc, reset }
}
