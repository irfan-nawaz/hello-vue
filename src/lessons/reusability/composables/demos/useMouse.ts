import { onMounted, onUnmounted, ref } from 'vue'

// A composable: a function that uses Composition API to encapsulate stateful logic
export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  // lifecycle hooks register on the component that CALLS the composable
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // return plain object of refs → destructurable without losing reactivity
  return { x, y }
}
