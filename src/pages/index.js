import * as React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <img src="/vercel.svg" alt="Vercel" className="logo" />
            <h1 className='mt-4'>
              Next.js starter
            </h1>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
