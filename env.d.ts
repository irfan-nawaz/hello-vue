/// <reference types="vite/client" />

// Compile-time feature flags, replaced by Vite's `define` (see vite.config.ts)
declare const __VUE_OPTIONS_API__: boolean
declare const __VUE_PROD_DEVTOOLS__: boolean
declare const __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: boolean

interface ImportMetaEnv {
  /** Example custom env var — set it in a .env file: VITE_APP_TITLE=… */
  readonly VITE_APP_TITLE?: string
}
