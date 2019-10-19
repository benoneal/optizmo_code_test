import createCLI from '../src/cli'

const mockProcess = () => {
  const originalResume = process.stdin.resume
  const originalPause = process.stdin.pause
  const originalOn = process.stdin.on
  const originalWrite = process.stdout.write
  const originalLog = console.log

  process.stdin.resume = jest.fn()
  process.stdin.pause = jest.fn()
  process.stdin.on = jest.fn()
  process.stdout.write = jest.fn()
  console.log = jest.fn()

  return () => {
    process.stdin.resume = originalResume
    process.stdin.pause = originalPause
    process.stdin.on = originalOn
    process.stdout.write = originalWrite
    console.log = originalLog
  }
}

test('cli', () => {
  const unmockProcess = mockProcess()
  const cli = createCLI()

  cli.listen(jest.fn())
  expect(process.stdin.on).toHaveBeenCalledWith('data', expect.any(Function))

  cli.notify('notify')
  expect(console.log).toHaveBeenCalledWith('>> notify')

  cli.prompt('prompt')
  expect(console.log).toHaveBeenCalledWith('>> prompt')
  expect(process.stdout.write).toHaveBeenCalledWith('')

  cli.exit('exit')
  expect(console.log).toHaveBeenCalledWith('>> exit')
  expect(process.stdin.pause).toHaveBeenCalled()
  
  unmockProcess()
})