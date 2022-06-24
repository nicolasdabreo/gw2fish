import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Popover, Transition } from '@headlessui/react'
import { XIcon, QuestionMarkCircleIcon, CheckCircleIcon } from '@heroicons/react/outline'
import {useCookies} from 'react-cookie'

import client from '../gw2client'

const API_KEY_PATTERN = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{20}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/

export default function Header ({ title }) {
  const { register, handleSubmit, setError, reset, formState } = useForm()
  const { isSubmitting, isSubmitSuccessful, errors, isDirty } = formState

  const [apiKey, setApiKey] = useState('')
  const [accountName, setAccountName] = useState('')
  const [instructionsOpen, setInstructionsOpen] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['gw2f.api_key', 'gw2f.account_name']);

  useEffect(() => {
    setApiKey(cookies['gw2f.api_key'])
    setAccountName(cookies['gw2f.account_name'])
  }, [cookies])

  async function submitApiKey (data) {
    return new Promise(async resolve => {
      const token = await client.validateToken(data.api_key)

      // Check correct permissions
      if (token.data?.id) {
        const account = await client.getAccount(data.api_key)
        setCookie('gw2f.api_key', data.api_key)
        setCookie('gw2f.account_name', account.data.name)
        reset({ api_key: '' }, { keepIsSubmitted: true })
      } else {
        setError('API Key was invalid')
      }

      resolve()
    })
  }

  function deleteApiKey (_e) {
    removeCookie('gw2f.api_key')
    removeCookie('gw2f.account_name')
  }

  return (
    <Popover className=''>
      {({ open }) => (
        <header className='mt-4'>
          <nav className='container px-4 mx-auto md:px-6 lg:px-8' aria-label='Top'>
            <div className={`${title ? 'justify-between' : 'justify-end'} flex items-center w-full py-3 border-b border-gray-400`}>
              {title && <a href='/' className='text-lg font-bold leading-7 sm:text-xl sm:truncate'>{title}</a>}

              <div className='flex flex-row ml-10 space-x-4' suppressHydrationWarning>
                {accountName && <h3 className='self-center font-semibold truncate text-medium'>{accountName}</h3>}
                <Popover.Button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                  {open ? <XIcon className='w-5 h-5' aria-hidden='true' /> : 'Add API Key'}
                </Popover.Button>
              </div>
            </div>
          </nav>

          <Transition
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel focus className='container absolute inset-x-0 z-10 p-2 px-4 mx-auto transition origin-top-right transform top-20 md:px-6 lg:px-8'>
              <div className='bg-white divide-y-2 rounded-lg shadow-lg dark:bg-gray-900 ring-1 ring-black ring-opacity-5 divide-gray-50'>
                <div className='px-5 pt-5 pb-6'>
                  <div className='mt-4'>
                    <div className='max-w-3xl mx-auto'>
                      <div className='flex flex-col flex-grow truncate'>
                        {apiKey && <h3 className='mb-2 font-semibold truncate text-medium'>{accountName}</h3>}
                        {apiKey && (
                          <div className='flex flex-row justify-between flex-grow mb-8 truncate'>
                            <p className='self-center text-sm font-medium truncate'>{apiKey}</p>
                            <button onClick={() => deleteApiKey()} className='bg-red-500 btn hover:bg-red-600'>
                              <XIcon className='w-5 h-5' aria-hidden='true' />
                            </button>
                          </div>
                        )}
                      </div>

                      <form onSubmit={handleSubmit(submitApiKey)}>
                        <label htmlFor='api_key' className='block text-sm font-medium text-gray-700 dark:text-white'>
                          New API Key
                        </label>
                        <div className='flex flex-row mt-1'>
                          <div className='relative flex-grow rounded-md shadow-sm'>
                            <input
                              {...register('api_key', { required: true, minLength: 4, pattern: API_KEY_PATTERN })}
                              className={`${errors.api_key ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:ring-1 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} border block w-full p-3 pr-10 rounded-md sm:text-sm dark:bg-slate-800 dark:text-gray-300 dark:border-gray-600`}
                              placeholder='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
                            />
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'>
                              <QuestionMarkCircleIcon onClick={() => setInstructionsOpen(!instructionsOpen)} className='w-5 h-5 text-gray-400' aria-hidden='true' />
                            </div>
                          </div>

                          {isSubmitting
                            ? (
                              <button type='button' className='inline-flex ml-4 w-28 btn' disabled=''>
                                <svg className='w-5 h-5 mr-3 -ml-1 text-white animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                                </svg>
                                Saving...
                              </button>
                              )
                            : (
                              <button type='submit' disabled={!isDirty} className='ml-4 w-28 btn'>
                                {isSubmitSuccessful ? <CheckCircleIcon className='inline-flex w-5 h-5' aria-hidden='true' /> : 'Save'}
                              </button>
                              )}
                        </div>
                        {errors.api_key && (
                          <p className='mt-2 text-sm text-red-600' id='email-error'>
                            Invalid API Key
                          </p>
                        )}
                      </form>
                    </div>
                  </div>
                  {instructionsOpen && (
                    <div className='mt-8'>
                      <Instructions />
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </header>
      )}
    </Popover>
  )
}

function Instructions () {
  return (
    <div className='max-w-3xl mx-auto'>
      <h2 className='block text-sm font-medium text-gray-700 dark:text-white'>
        Instructions
      </h2>

      <ol className='px-8 py-4 list-decimal'>
        <li className='text-sm font-medium'>Go to the <a className='underline' href='https://account.arena.net/applications' target='_blank' rel='noreferrer'>official Guild Wars 2 API Key Management</a></li>
        <li className='text-sm font-medium'>Click on the "New Key" button</li>
        <li className='text-sm font-medium'>Enter a name of your choice and check all permission checkboxes.</li>
        <li className='text-sm font-medium'>Copy your new API key.</li>
        <li className='text-sm font-medium'>Paste it in the form above.</li>
        <li className='text-sm font-medium'>Click the "Save" button.</li>
      </ol>
    </div>
  )
}
