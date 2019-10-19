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
  const intervalAlerts = createIntervalAlerts()
  const mockOutput = jest.fn()

  intervalAlerts.start(mockOutput, 1000)
  expect(mockOutput).toHaveBeenCalled()
  expect(clearInterval).not.toHaveBeenCalled()
  
  intervalAlerts.stop()
  expect(clearInterval).toHaveBeenCalled()

  unmockIntervals()
})