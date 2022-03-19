export function tyriaTime() {
  const tyrianSecs = (Date.now() % (2 * 60 * 60 * 1000)) / 1000

  const tyrianHours = Math.floor(tyrianSecs / 300)
  const tyrianMinutes = Math.round((tyrianSecs / 5) - tyrianHours * 60)

  return `${formatTime(tyrianHours)}:${formatTime(tyrianMinutes)}`
}

export function tyriaTimeOfDay() {
  const now = tyriaTime()
  const [hours, _minutes] = now.split(':')

  if (isBetweenHours(hours, '06:00', '20:00')) {
    return 'Day'
  } else if (isBetweenHours(hours, '20:00', '21:00')) {
    return 'Dusk'
  } else if (isBetweenHours(hours, '21:00', '05:00')) {
    return 'Night'
  } else if (isBetweenHours(hours, '05:00', '06:00')) {
    return 'Dawn'
  }
}

function canthaTime() {
  return null
}

function canthaTimeOfDay() {
  return null
}

function formatTime(int) {
  return int.toString().padStart(2, '0')
}

function isBetweenHours(hour, startHour, endHour) {
  return hour >= parseInt(startHour, 10) && hour <= parseInt(endHour, 10)
}
