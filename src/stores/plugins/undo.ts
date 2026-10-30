import { ref } from 'vue'
import type { PiniaPluginContext } from 'pinia'

/**
 * Pinia plugin: stores defined with `{ undo: true }` get `$undo()` and `$undoDepth`.
 * Registered in main.ts with pinia.use(undoPlugin). See the Pinia lesson.
 */
export function undoPlugin({ store, options }: PiniaPluginContext) {
  if (!options.undo) return

  const history = ref<string[]>([JSON.stringify(store.$state)])
  let restoring = false

  // flush: 'sync' → one snapshot per mutation (or per $patch)
  store.$subscribe(
    () => {
      if (restoring) return
      history.value.push(JSON.stringify(store.$state))
      if (history.value.length > 50) history.value.shift()
    },
    { flush: 'sync' },
  )

  function $undo() {
    if (history.value.length < 2) return
    history.value.pop()
    restoring = true
    store.$patch(JSON.parse(history.value[history.value.length - 1]!))
    restoring = false
  }

  return { $undo, $undoDepth: () => history.value.length - 1 }
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    /** enable the undo plugin for this store */
    undo?: boolean
  }
  export interface PiniaCustomProperties {
    $undo: () => void
    $undoDepth: () => number
  }
}
