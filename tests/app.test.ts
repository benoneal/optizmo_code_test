import app from '../src/app'
import messages from '../src/messages'

test('app', () => {
  let input: (s: string) => void
  const cli = {
    listen: jest.fn((inputHandler: (s: string) => void) => input = inputHandler),
    notify: jest.fn(),
    prompt: jest.fn(),
    exit: jest.fn()
  }
  const found_emails: Set<string> = new Set()
  const missing_emails: Set<string> = new Set()
  const state = {
    found_emails,
    missing_emails,
    alert_interval: 0
  }
  const alerts = {
    start: jest.fn(),
    stop: jest.fn()
  }
  const mockEmailList = new Set(['test@test.com'])
  const data = {
    exists: jest.fn(email => mockEmailList.has(email))
  }

  app({
    interface: cli,
    inputState: state,
    intervalAlerts: alerts,
    dataStore: data
  }).start()

  expect(cli.listen).toHaveBeenCalled()
  expect(input).toEqual(expect.any(Function))
  expect(cli.notify).toHaveBeenCalledWith(messages.WELCOME)
  expect(cli.prompt).toHaveBeenCalledWith(messages.COMMANDS)

  input('10')
  expect(alerts.start).toHaveBeenCalledWith(cli.notify, 10000)
  expect(cli.prompt).toHaveBeenCalledWith(messages.ALERT_STARTED)

  input('stop')
  expect(alerts.stop).toHaveBeenCalled()
  expect(cli.prompt).toHaveBeenCalledWith(messages.ALERT_STOPPED)

  input('start')
  expect(alerts.start).toHaveBeenCalledWith(cli.notify, 10000)
  expect(cli.prompt).toHaveBeenCalledWith(messages.ALERT_STARTED)

  input('gibberish')
  expect(cli.prompt).toHaveBeenCalledWith(messages.BAD_INPUT)

  input('help')
  expect(cli.prompt).toHaveBeenCalledWith(messages.COMMANDS)

  input('test@test.com')
  expect(cli.prompt).toHaveBeenCalledWith(messages.EMAIL_FOUND)
  expect(found_emails.has('test@test.com')).toBe(true)

  input('test1@test.com')
  expect(cli.prompt).toHaveBeenCalledWith(messages.EMAIL_MISSING)
  expect(missing_emails.has('test1@test.com')).toBe(true)

  input('quit')
  expect(cli.exit).toHaveBeenCalledWith(messages.EXIT)
})