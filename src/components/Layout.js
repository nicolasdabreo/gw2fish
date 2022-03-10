import * as React from 'react'
import Image from 'next/image'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className='container mx-auto mb-auto'>
        {children}
      </main>
      <Footer />
    </>
  )
}

function Header() {
  return (
    <header className='mt-4'>
      <nav className='container px-4 mx-auto md:px-6 lg:px-8' aria-label='Top'>
        <div className='flex items-center justify-end w-full py-3 border-b border-gray-400'>
          <div className='ml-10 space-x-4'>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add API Key
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-white">
      <div className="container py-12 mx-auto md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">

        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="ml-8 text-base text-center text-gray-400">Made by <a className='underline' href='https://gitlab.com/Dabsy'>Nicolas Dabreo</a> (Dabs.7509)</p>
        </div>
      </div>
    </footer>
  )
}
