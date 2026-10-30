import type { Section } from './types'

/** Sidebar order. `id` is the folder name under src/lessons/ */
export const sections: Section[] = [
  { id: 'getting-started', title: 'Getting Started', icon: 'Rocket' },
  { id: 'essentials', title: 'Essentials', icon: 'Sprout' },
  { id: 'components', title: 'Components In-Depth', icon: 'Boxes' },
  { id: 'reusability', title: 'Reusability', icon: 'Recycle' },
  { id: 'built-ins', title: 'Built-in Components', icon: 'Puzzle' },
  { id: 'reactivity', title: 'Reactivity Deep Dive', icon: 'Zap' },
  { id: 'rendering', title: 'Rendering', icon: 'Layers' },
  { id: 'options-api', title: 'Options API', icon: 'SlidersHorizontal' },
  { id: 'sfc', title: 'SFC & TypeScript', icon: 'FileCode' },
  { id: 'ecosystem', title: 'Scaling Up & Ecosystem', icon: 'Network' },
  { id: 'best-practices', title: 'Best Practices', icon: 'ShieldCheck' },
]
