export const isNumber = (n: string | number) => typeof n === 'number' || (!isNaN(Number(n)) && !isNaN(parseInt(n)))

export const isEmail = (email: string) => /^\S+@\S+$/.test(email.toLowerCase())

export const curriedPropAppend = (str: string) => (item: string) => `${item}: ${str}`

export const flat = (...arrs: string[][]): string[] => [].concat(...arrs)