import messages from './messages'
import {isNumber, isEmail, curriedPropAppend, flat} from './utils'
import {IOAPI, InputState, Alerts, DataStore} from '../typings/interfaces'

interface AppDependencies {
  interface: IOAPI,
  inputState: InputState,
  intervalAlerts: Alerts,
  dataStore: DataStore
}

const app = ({
  interface: {
    listen, 
    notify, 
    prompt, 
    exit
  },
  inputState: {
    found_emails,
    missing_emails,
    alert_interval
  },
  intervalAlerts,
  dataStore
}: AppDependencies) => {
  const inputHandlers = {
    help: () => prompt(messages.COMMANDS),
    start: (interval: string) => {
      alert_interval = (parseInt(interval) * 1000) || alert_interval
      intervalAlerts.start(notify, alert_interval)
      prompt(messages.ALERT_STARTED)
    },
    stop: () => {
      intervalAlerts.stop()
      prompt(messages.ALERT_STOPPED)
    },
    quit: () => {
      intervalAlerts.stop()
      exit(messages.EXIT)
    }
  }

  const handleEmail = (email: string) => {
    // NB: Feature does not specify that entered emails should be added to datastore, so they aren't
    const found = dataStore.exists(email)
    const matchedSet = found ? found_emails : missing_emails
    matchedSet.add(email)
    // Missing notifications are not specified, but added because useful
    prompt(found ? messages.EMAIL_FOUND : messages.EMAIL_MISSING)
  }

  const handleError = () => prompt(messages.BAD_INPUT)

  const handleInput = (input: string) => {
    const handler = isNumber(input) 
      ? inputHandlers.start 
      : isEmail(input)
      ? handleEmail
      : inputHandlers.hasOwnProperty(input)
      ? inputHandlers[input]
      : handleError

    handler(input)
  }

  return {
    start: () => {
      listen(handleInput)
      notify(messages.WELCOME)
      inputHandlers.help()
    }
  }
}

export default app