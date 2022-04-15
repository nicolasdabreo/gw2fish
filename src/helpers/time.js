export function tyriaTime () {
  const tyrianSecs = (Date.now() % (2 * 60 * 60 * 1000)) / 1000
  const tyrianHours = Math.floor(tyrianSecs / 300)
  const tyrianMinutes = Math.round((tyrianSecs / 5) - tyrianHours * 60)

  return [tyrianHours, tyrianMinutes]
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
