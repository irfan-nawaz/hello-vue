// Type-level tests: this file is checked by `pnpm type-check` (vue-tsc).
// If any `Expect<…>` is false, the build fails — types as executable documentation.
import type { ExtractPropTypes, ExtractPublicPropTypes, PropType } from 'vue'

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
type Expect<T extends true> = T

export const buttonProps = {
  label: { type: String, required: true },
  size: { type: String as PropType<'sm' | 'md'>, default: 'md' },
  disabled: Boolean,
} as const

// Inside the component: defaults applied, booleans always present
type Internal = ExtractPropTypes<typeof buttonProps>
// What a PARENT may pass: props with defaults are optional
type Public = ExtractPublicPropTypes<typeof buttonProps>

export type Tests = [
  Expect<Equal<Internal['size'], 'sm' | 'md'>>, // required internally (has default)
  Expect<Equal<Internal['disabled'], boolean>>, // Boolean props are always boolean
  Expect<Equal<Public['size'], 'sm' | 'md' | undefined>>, // optional for the parent
  Expect<Equal<Public['label'], string>>,
]
