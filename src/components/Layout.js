import React from 'react'

import Header from './Header'

export default function Layout ({ children }) {
  return (
    <>
      <Header title='gw2.fish' />
      <main className='container mx-auto mb-auto'>
        {children}
      </main>
      <Footer />
    </>
  )
}

function Footer () {
  return (
    <footer className='bg-white dark:bg-gray-900'>
      <div className='container py-12 mx-auto md:flex md:items-center md:justify-between'>
        <div className='flex justify-center space-x-6 md:order-2' />
        <div className='mt-8 md:mt-0 md:order-1'>
          <p className='ml-8 text-base text-center text-gray-400'>Made by <a className='underline' href='https://gitlab.com/Dabsy'>Nicolas Dabreo</a> (Dabs.7509)</p>
        </div>
      </div>
    </footer>
  )
}
