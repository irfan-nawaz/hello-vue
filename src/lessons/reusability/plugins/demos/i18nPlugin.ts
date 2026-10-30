import { inject, ref, type InjectionKey, type Plugin, type Ref } from 'vue'

type Messages = Record<string, Record<string, string>>

interface I18n {
  locale: Ref<string>
  t: (key: string) => string
}

const i18nKey: InjectionKey<I18n> = Symbol('i18n')

// A plugin is an object with install(app, options) (or just a function)
export const i18nPlugin: Plugin<{ messages: Messages; locale?: string }> = {
  install(app, { messages, locale = 'en' }) {
    const current = ref(locale)
    const t = (key: string) => messages[current.value]?.[key] ?? key

    // 1. global property → $t() in every template (typed in augment.d.ts)
    app.config.globalProperties.$t = t
    // 2. provide → inject in setup / composables
    app.provide(i18nKey, { locale: current, t })
    // 3. global directive / component work the same way
    app.directive('t', (el: HTMLElement, { value }) => (el.textContent = t(value)))
  },
}

// the composable side of the plugin
export function useI18n() {
  const i18n = inject(i18nKey)
  if (!i18n) throw new Error('i18nPlugin not installed')
  return i18n
}
