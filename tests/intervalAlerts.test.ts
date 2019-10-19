import createIntervalAlerts from '../src/intervalAlerts'

const mockIntervals = () => {
  const orig_setInterval = global.setInterval
  const orig_clearInterval = global.clearInterval
  global.setInterval = jest.fn((fn, interval) => (fn(), {} as NodeJS.Timer))
  global.clearInterval = jest.fn()
  return () => {
    global.setInterval = orig_setInterval
    global.clearInterval = orig_clearInterval
  }
}

test('intervalAlerts', () => {
  const unmockIntervals = mockIntervals()
  const found: Set<string> = new Set(['c', 'b', 'a'])
  const missing: Set<string> = new Set(['e', 'f', 'd'])
  const intervalAlerts = createIntervalAlerts(found, missing)
  const mockNotify = jest.fn()

  intervalAlerts.start(mockNotify, 1000)
  expect(mockNotify).toHaveBeenCalledWith('a: true, b: true, c: true, d: false, e: false, f: false')
  expect(setInterval).toHaveBeenCalledTimes(1)
  expect(clearInterval).not.toHaveBeenCalled()
  
  intervalAlerts.stop()
  expect(clearInterval).toHaveBeenCalled()

  found.add('1')
  missing.add('2')
  intervalAlerts.start(mockNotify, 1000)
  expect(mockNotify).toHaveBeenCalledWith('1: true, a: true, b: true, c: true, 2: false, d: false, e: false, f: false')
  expect(setInterval).toHaveBeenCalledTimes(2)

  unmockIntervals()
})