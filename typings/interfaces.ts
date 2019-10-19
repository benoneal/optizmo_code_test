export interface IOAPI {
  listen: (handler: (s: string) => void) => void,
  notify: (s: string) => void,
  prompt: (s: string) => void,
  exit: (s: string) => void
}

export interface Alerts {
  start: (fn: () => void, n: number) => void,
  stop: () => void
}

export interface DataStore {
  exists: (s: string) => boolean
}

export interface InputState {
  found_emails: Set<string>,
  missing_emails: Set<string>,
  alert_interval: number
}