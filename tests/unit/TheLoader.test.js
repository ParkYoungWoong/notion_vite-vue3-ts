import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheLoader from '~/components/TheLoader.vue'

test('render', () => {
  const wrapper = mount(TheLoader)
  expect(wrapper.vm.a).toEqual(1)
  expect(wrapper.vm.b()).toEqual('B!')
})
