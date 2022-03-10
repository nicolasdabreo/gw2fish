function tyriaTime () {
  const now = new Date()
  const utcHours = now.getUTCHours()
  const utcMinutes = now.getUTCMinutes()
  const utcSeconds = now.getUTCMinutes()

  const tyrianHours = Math.floor((utcHours % 2) * 12 + utcMinutes / 5)
  const tyrianMinutes = Math.floor((utcMinutes % 5) * 12 + utcSeconds / 5)

  return `${formatTime(tyrianHours)}:${formatTime(tyrianMinutes)}`
}

function canthaTime () {
  return null
}

function canthaTimeOfDay () {
  return null
}

function tyriaTimeOfDay () {
  return null
}

function formatTime (int) {
  return int.toString().padStart(2, '0')
}
