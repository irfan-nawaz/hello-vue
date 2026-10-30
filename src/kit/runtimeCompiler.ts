import * as Vue from 'vue'
import { compile, type CompilerOptions } from '@vue/compiler-dom'

/**
 * The default `vue` import is the *runtime-only* build: SFC templates are compiled
 * by Vite ahead of time. Registering a compiler here gives us what the full
 * (CDN) build has, so demos can use the `template` option and in-DOM templates —
 * this is exactly what `vue/dist/vue.esm-bundler.js` does internally.
 */
export function installRuntimeCompiler() {
  Vue.registerRuntimeCompiler(((template: string, options?: CompilerOptions) => {
    const { code } = compile(template, { hoistStatic: true, ...options })
    // Generated code is `const _Vue = Vue; return function render(_ctx, _cache) {…}`
    const render = new Function('Vue', code)(Vue)
    // marks it as runtime-compiled so Vue uses the `with(_ctx)`-friendly instance proxy
    render._rc = true
    return render
  }) as unknown as Parameters<typeof Vue.registerRuntimeCompiler>[0])
}
