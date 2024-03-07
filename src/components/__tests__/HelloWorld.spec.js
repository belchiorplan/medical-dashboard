import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Dashboard from '../Dashboard.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Dashboard, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
