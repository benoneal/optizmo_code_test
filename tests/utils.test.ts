import {
  isNumber,
  isEmail,
  curriedPropAppend,
  flat
} from '../src/utils'

test('isNumber', () => {
  const inputs = [23, '23', '23s', 'twentythree', {}, [], [23]]
  const expected = [true, true, false, false, false, false, true]
  expect(inputs.map(isNumber)).toEqual(expected)
})

test('isEmail', () => {
  const inputs = ['1@2.3', '1.2.3', '123', 'a@b.c', 'a.b.c', 'abc']
  const expected = [true, false, false, true, false, false]
  expect(inputs.map(isEmail)).toEqual(expected)
})

test('curriedPropAppend', () => {
  expect(curriedPropAppend('testVal')('testProp')).toBe('testProp: testVal')
})

test('flat', () => {
  expect(flat(['a', 'b', 'c'], ['d', 'e', 'f'])).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
})