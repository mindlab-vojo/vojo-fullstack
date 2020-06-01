export class Texthandler {
  capitalize = (str) => {
    if (typeof str !== 'string') return null

    str = str.toLowerCase()
    str = str.charAt(0).toUpperCase() + str.slice(1)

    return str
  }
}