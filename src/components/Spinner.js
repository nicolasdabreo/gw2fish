import React from 'react'

export default function Spinner({ classes }) {
  return (
    <div className='flex items-center justify-center space-x-2'>
      <div className={`${classes} inline-block text-blue-600 border-4 rounded-full spinner-border animate-spin`} role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}
