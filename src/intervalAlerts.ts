import {Alerts} from '../typings/interfaces'

const createIntervalAlerts = (): Alerts => {
  let intervalTimer: any
  const start = (output: () => void, interval: number) => intervalTimer = setInterval(output, interval)
  const stop = () => clearInterval(intervalTimer)
  return {start, stop}
}

export default createIntervalAlerts