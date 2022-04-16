import axios from 'axios'

export function tyriaTime () {
  const tyrianSecs = (Date.now() % (2 * 60 * 60 * 1000)) / 1000
  const tyrianHours = Math.floor(tyrianSecs / 300)
  const tyrianMinutes = Math.round((tyrianSecs / 5) - tyrianHours * 60)

  if (tyrianMinutes === 60) {
    return [tyrianHours + 1, 0]
  } else {
    return [tyrianHours, tyrianMinutes]
  }
}

export function tyriaTimeOfDay () {
  const [hours, minutes] = tyriaTime()

  if (isBetween(hours, 6, 19) && isBetween(minutes, 0, 59)) {
    return 'Day'
  } else if (isBetween(hours, 20, 20) && isBetween(minutes, 0, 59)) {
    return 'Dusk'
  } else if (isBetween(hours, 5, 5) && isBetween(minutes, 0, 59)) {
    return 'Dawn'
  } else {
    return 'Night'
  }
}

export function formatTime ([hours, minutes]) {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

function isBetween (num, low, high) {
  if (num >= low && num <= high) {
    return true
  } else {
    return false
  }
}

export const fetcher = url => axios.get(url).then(res => res.data)

export function slugify (string) {
  const newString = string.replace(' Fisher', '')
  return toSnakeCase(newString)
}

export const toSnakeCase = str =>
  str &&
  str
    .replace(/[^\w\s]/gi, '')
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')

export const zipAndMerge = (a1, a2) => a1.map((a, i) => {
  const target = a2[i]

  if (!a || !target) {
    return null
  } else {
    return { ...a, ...target }
  }
})

export const underscore = str => str && str.replace(/\s/g, '_')
