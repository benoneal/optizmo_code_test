import {readFileSync, read} from 'fs'
import {resolve} from 'path'

import {DataStore} from '../typings/interfaces'

const emailList = new Set(readFileSync(resolve(__dirname, 'emailList.txt'), 'utf8').split(/[\r\n]+/))

const dataStore: DataStore = {
  exists: (email: string) => emailList.has(email)
}

export default dataStore