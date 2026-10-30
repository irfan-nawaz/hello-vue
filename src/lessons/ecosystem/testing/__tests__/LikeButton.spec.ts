import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LikeButton from '../demos/LikeButton.vue'

// Component tests: mount, interact like a user, assert on DOM + emitted events
describe('LikeButton', () => {
  it('renders the count', () => {
    const wrapper = mount(LikeButton, { props: { modelValue: 3 } })
    expect(wrapper.text()).toContain('3')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(LikeButton, { props: { modelValue: 0 } })
    await wrapper.get('[data-testid="like"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]])
  })

  it('is disabled at max', () => {
    const wrapper = mount(LikeButton, { props: { modelValue: 5, max: 5 } })
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
  })
})
