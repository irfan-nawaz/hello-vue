import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { lessons } from '@/lessons/registry'

/** Which lessons the learner marked as done — persisted to localStorage */
export const useProgressStore = defineStore('progress', () => {
  const done = useLocalStorage<string[]>('vue-lab:done', [])

  const doneSet = computed(() => new Set(done.value))
  const percent = computed(() =>
    lessons.length ? Math.round((doneSet.value.size / lessons.length) * 100) : 0,
  )

  function isDone(path: string) {
    return doneSet.value.has(path)
  }

  function toggle(path: string) {
    done.value = isDone(path) ? done.value.filter((p) => p !== path) : [...done.value, path]
  }

  function sectionPercent(section: string) {
    const inSection = lessons.filter((l) => l.section === section)
    if (!inSection.length) return 0
    return Math.round((inSection.filter((l) => isDone(l.path)).length / inSection.length) * 100)
  }

  function reset() {
    done.value = []
  }

  return { done, percent, isDone, toggle, sectionPercent, reset }
})
