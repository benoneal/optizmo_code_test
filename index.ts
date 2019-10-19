import app from './src/app'
import createCLI from './src/cli'
import createIntervalAlerts from './src/intervalAlerts'
import dataStore from './src/dataStore'

const found_emails: Set<string> = new Set()
const missing_emails: Set<string> = new Set()

const inputState = {
  found_emails,
  missing_emails,
  alert_interval: 0
}

app({
  interface: createCLI(),
  intervalAlerts: createIntervalAlerts(),
  inputState,
  dataStore
}).start()