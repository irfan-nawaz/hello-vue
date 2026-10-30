import { createRenderer } from 'vue'

// Our "host elements": plain JS objects that describe shapes
export interface CNode {
  type: string
  props: Record<string, unknown>
  children: CNode[]
  parent: CNode | null
  text?: string
}

export function createCanvasRenderer(draw: () => void) {
  let queued = false
  const scheduleDraw = () => {
    if (queued) return
    queued = true
    queueMicrotask(() => {
      queued = false
      draw()
    })
  }
  const ops = { created: 0, inserted: 0, removed: 0, patched: 0 }

  // createRenderer receives node operations — the only platform-specific part of Vue
  const renderer = createRenderer<CNode, CNode>({
    createElement: (type) => (ops.created++, { type, props: {}, children: [], parent: null }),
    createText: (text) => ({ type: '#text', props: {}, children: [], parent: null, text }),
    createComment: (text) => ({ type: '#comment', props: {}, children: [], parent: null, text }),
    setText: (node, text) => ((node.text = text), scheduleDraw()),
    setElementText: (node, text) => ((node.text = text), scheduleDraw()),
    insert(child, parent, anchor) {
      ops.inserted++
      child.parent = parent
      const i = anchor ? parent.children.indexOf(anchor) : -1
      if (i >= 0) parent.children.splice(i, 0, child)
      else parent.children.push(child)
      scheduleDraw()
    },
    remove(child) {
      ops.removed++
      const p = child.parent
      if (p) p.children.splice(p.children.indexOf(child), 1)
      scheduleDraw()
    },
    patchProp(el, key, _prev, next) {
      ops.patched++
      el.props[key] = next
      scheduleDraw()
    },
    parentNode: (node) => node.parent,
    nextSibling: (node) => {
      const sibs = node.parent?.children ?? []
      return sibs[sibs.indexOf(node) + 1] ?? null
    },
  })
  return { ...renderer, ops }
}
