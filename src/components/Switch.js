import React, { useEffect, useState } from 'react'
import { Switch as TailwindSwitch } from '@headlessui/react'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

function noop () { }

export default function Switch ({ label = '', sublabel = '', handleToggle = noop }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    handleToggle(enabled)
  }, [enabled])

  return (
    <TailwindSwitch.Group as="div" className="flex items-center">
      <TailwindSwitch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
      >
        <span
          aria-hidden='true'
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </TailwindSwitch>
      
      <TailwindSwitch.Label as='label' className='cursor-pointer'>
        {label && <span className='ml-4 text-sm font-medium text-gray-900 dark:text-white'>{label}</span>}
        {sublabel && <span className='ml-4 text-sm text-gray-500 dark:text-gray-300'>{sublabel}</span>}
      </TailwindSwitch.Label>
    </TailwindSwitch.Group>
  )
}
