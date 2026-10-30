import { ref, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'

// Accepts a plain value, a ref, or a getter — normalised with toValue()
export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  watchEffect(async (onCleanup) => {
    const controller = new AbortController()
    onCleanup(() => controller.abort())
    loading.value = true
    error.value = null
    try {
      // toValue() inside watchEffect → the url (ref or getter) is tracked
      const res = await fetch(toValue(url), { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
    } catch (e) {
      if ((e as Error).name !== 'AbortError') error.value = e as Error
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
