import React, { useState, useEffect } from 'react'

import { tyriaTime, tyriaTimeOfDay } from '../helpers/time'

export default function Clock() {
  const [date, setDate] = useState(tyriaTime())
  const [timeOfDay, setTimeOfDay] = useState(tyriaTimeOfDay())

  function refreshClock() {
    setDate(tyriaTime())
    setTimeOfDay(tyriaTimeOfDay())
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000)
    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

  return (
    <div className='flex flex-col'>
      <time className='text-6xl'>{date}</time>
      <time className='text-xl'>{timeOfDay}</time>
    </div>
  )
}
