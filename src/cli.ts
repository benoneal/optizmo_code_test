import {IOAPI} from '../typings/interfaces'

const createCLI = (): IOAPI => {
  process.stdin.resume()

  const log = (message: string) => console.log(`>> ${message}`)
  
  return {
    listen: (handler: (s: string) => void) => process.stdin.on('data', data => handler(data.toString().trim())),
    notify: log,
    prompt: (message: string) => {
      log(message)
      process.stdout.write('')
    },
    exit: (message: string) => {
      log(message)
      process.stdin.pause()
    }
  }
}

export default createCLI
