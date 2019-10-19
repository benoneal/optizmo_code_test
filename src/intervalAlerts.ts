import {curriedPropAppend, flat} from './utils'
import {Alerts, InputState} from '../typings/interfaces'

const createIntervalAlerts = (found: InputState['found_emails'], missing: InputState['missing_emails']): Alerts => {
  let intervalTimer: any
  const alert = (output: (s: string) => void) => () => output(flat(
    [...found].sort().map(curriedPropAppend('true')),
    [...missing].sort().map(curriedPropAppend('false'))
  ).join(', '))
  const start = (output: (s: string) => void, interval: number) => intervalTimer = setInterval(alert(output), interval)
  const stop = () => clearInterval(intervalTimer)
  return {start, stop}
}

export default createIntervalAlerts