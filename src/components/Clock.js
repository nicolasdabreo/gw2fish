import React, { useState, useEffect } from 'react'

import { tyriaTime, tyriaTimeOfDay, formatTime } from '../utils'

export default function Clock ({ timezone }) {
  const [time, setTime] = useState(tyriaTime())
  const [timeOfDay, setTimeOfDay] = useState(tyriaTimeOfDay())

  function refreshClock () {
    setTime(tyriaTime())
    setTimeOfDay(tyriaTimeOfDay())
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 5000)
    return function cleanup () {
      clearInterval(timerId)
    }
  }, [])

  return (
    <div className='flex flex-col text-right'>
      <h2 className='text-md'>{timezone}</h2>
      <time className='text-6xl'>{formatTime(time)}</time>
      <time className='text-xl'>{timeOfDay}</time>
    </div>
  )
}
