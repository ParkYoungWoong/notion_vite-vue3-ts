import { test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import TestComponent from './TestComponent.vue'

test('getKeys', () => {
  const wrapper = shallowMount(TestComponent)
  const data = {
    a: 1,
    b: 2,
    c: 3
  }
  const res = wrapper.vm.getKeys(data)
  expect(res).toEqual(['a', 'b', 'c'])
})

test('getValues', () => {
  const wrapper = shallowMount(TestComponent)
  const data = {
    a: 1,
    b: 2,
    c: 3
  }
  const res = wrapper.vm.getValues(data)
  expect(res).toEqual([1, 2, 3])
})
