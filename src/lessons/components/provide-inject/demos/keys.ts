import type { InjectionKey, Ref } from 'vue'

export interface ThemeContext {
  color: Readonly<Ref<string>>
  setColor: (c: string) => void
}

// A typed, collision-free key: inject(themeKey) is typed as ThemeContext | undefined
export const themeKey: InjectionKey<ThemeContext> = Symbol('theme')
