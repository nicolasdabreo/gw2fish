import * as React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="container mx-auto mb-auto">
                {children}
            </main>
            <Footer />
        </>
    )
}

function Header() {
    return (
        <header className="bg-gray-900">
            <nav className="container px-4 mx-auto md:px-6 lg:px-8" aria-label="Top">
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
        <footer className="bg-gray-900" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="container px-4 py-12 mx-auto lg:py-16 md:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-4 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <div className='flex items-center text-lg font-black leading-4 tracking-wide text-white rounded-md select-none'>
                            <img className="w-auto h-10 rounded-full" src="/logo.png" alt="" />
                            <span className="sr-only">GW2 Fish logo</span>
                        </div>
                        <p className="text-base text-white">
                            An app for tracking your fishing achievement progress.
                        </p>
                        {/* <div className="flex space-x-6">
                            {navigation.social.map((item) => (
                                <a key={item.name} href={item.href} className="text-white hover:text-gray-100">
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="w-6 h-6" aria-hidden="true" />
                                </a>
                            ))}
                        </div> */}
                    </div>

                    <div className="mt-12 xl:mt-0">
                        <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Support</h3>
                        <ul role="list" className="mt-4 space-y-4">
                            {/* {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-white hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))} */}
                        </ul>
                    </div>

                    <div className="mt-12 xl:mt-0">
                        <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Contact</h3>
                        <ul role="list" className="mt-4 space-y-4">
                            {/* {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-white hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))} */}
                        </ul>
                    </div>

                    <div className="mt-12 xl:mt-0">
                        <h3 className="text-sm font-semibold tracking-wider text-white uppercase">About</h3>
                        <ul role="list" className="mt-4 space-y-4">
                            {/* {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-white hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))} */}
                        </ul>
                    </div>
                </div>
            </div>
        </footer >
    )
}