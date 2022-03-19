export function tyriaTime() {
  const tyrianTotalSecs = (Date.now() % (2 * 60 * 60 * 1000)) / 1000

  const tyrianHours = Math.floor(tyrianTotalSecs / 300)
  const tyrianMinutes = Math.round(tyrianTotalSecs / 5) - tyrianHours * 60
  const tyrianSeconds = Math.round(tyrianTotalSecs * 12 - (tyrianHours * 3600) - (tyrianMinutes * 60)) + 30

  if (tyrianMinutes === 60 && tyrianSeconds <= 31) {
    return `${formatTime(tyrianHours == 23 ? 0 : tyrianHours + 1)}:00:${formatTime(tyrianSeconds)}`
  }
  return `${formatTime(tyrianHours)}:${formatTime(tyrianMinutes)}:${formatTime(tyrianSeconds == 60 ? 0 : tyrianSeconds)}`
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
