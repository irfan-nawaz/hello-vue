import type { HighlighterCore } from 'shiki/core'

// Fine-grained shiki: only the languages/themes this lab uses (the full bundle ships ~200 grammars)
const langs = {
  vue: () => import('shiki/langs/vue.mjs'),
  ts: () => import('shiki/langs/typescript.mjs'),
  tsx: () => import('shiki/langs/tsx.mjs'),
  js: () => import('shiki/langs/javascript.mjs'),
  bash: () => import('shiki/langs/bash.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  md: () => import('shiki/langs/markdown.mjs'),
}

let highlighter: Promise<HighlighterCore> | undefined

async function getHighlighter() {
  const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
  ])
  return createHighlighterCore({
    themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
    langs: Object.values(langs).map((load) => load()),
    engine: createJavaScriptRegexEngine(),
  })
}

/** Lazily highlights code; unknown languages fall back to plain text */
export async function highlight(code: string, lang: string) {
  highlighter ??= getHighlighter()
  const h = await highlighter
  const id = lang === 'ts' ? 'typescript' : lang === 'js' ? 'javascript' : lang === 'md' ? 'markdown' : lang
  return h.codeToHtml(code, {
    lang: h.getLoadedLanguages().includes(id) ? id : 'text',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: 'light',
  })
}
