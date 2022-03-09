import * as React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

function Header() {
    return (
        <header className="bg-gray-800">
            <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex items-center justify-between w-full py-6 border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        <a href="/" className='flex items-center text-lg font-black leading-4 tracking-wide text-white rounded-md select-none'>
                            <img className="w-auto h-10 rounded-full" src="/logo.png" alt="" />
                            <span className="sr-only">GW2 Fish logo</span>
                            <span className="ml-4">GW2 Fish</span>
                        </a>
                    </div>
                    <div className="ml-10 space-x-4">
                        <a href="#" className="inline-block px-2 text-base font-medium text-white no-underline hover:underline">
                            About
                        </a>
                        <a href="#" className="inline-block px-2 text-base font-medium text-white no-underline hover:underline">
                            Equipment
                        </a>
                        <a href="#" className="inline-block px-2 text-base font-medium text-white no-underline hover:underline">
                            Tips
                        </a>
                        <a href="#" className="inline-block px-2 text-base font-medium text-white no-underline hover:underline">
                            API Keys
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}

function Footer() {
    return (
        <></>
    )
}