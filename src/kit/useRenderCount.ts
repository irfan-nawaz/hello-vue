import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, useTemplateRef } from 'vue'

/**
 * Counts renders of the calling component and writes the number straight into
 * the DOM element with the given template ref — writing it to reactive state
 * would itself cause another render.
 */
export function useRenderCount(refKey: string) {
  const el = useTemplateRef<HTMLElement>(refKey)
  let n = 0
  const paint = () => {
    if (!el.value) return
    el.value.textContent = `renders: ${n}`
    el.value.animate([{ backgroundColor: 'oklch(0.69 0.14 160 / .5)' }, {}], { duration: 500 })
  }
  onBeforeMount(() => n++)
  onBeforeUpdate(() => n++)
  onMounted(paint)
  onUpdated(paint)
}
