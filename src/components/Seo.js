import * as React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const DEFAULTS = {
  title: 'Dashboard',
  siteName: 'gw2.Fish',
  description: 'Achievement and title progress tracker for GW2 fishing',

  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'https://gw2.fish',
  type: 'website',
  robots: 'follow, index',

  /** No need to be filled, will be populated with openGraph function */
  image: '/6471.jpg'
}

const FAVICONS = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-icon-192x192.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: '/favicon/android-icon-512x512.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png'
  }
]

export default function Seo ({ meta = {} }) {
  const router = useRouter()
  const metadata = {...DEFAULTS, ...meta}
  const title = `${metadata.title} - ${metadata.siteName}`

  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content={metadata.robots} />
      <meta content={metadata.description} name='description' />
      <meta property='og:url' content={`${metadata.url}${router.asPath}`} />
      <link rel='canonical' href={`${metadata.url}${router.asPath}`} />

      {/* Open Graph */}
      <meta property='og:type' content={metadata.type} />
      <meta property='og:site_name' content={metadata.siteName} />
      <meta property='og:description' content={metadata.description} />
      <meta property='og:title' content={title} />
      <meta name='image' property='og:image' content={metadata.image} />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={metadata.description} />
      <meta name='twitter:image' content={metadata.image} />
      {metadata.date && (
        <>
          <meta property='article:published_time' content={metadata.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={metadata.date}
          />
          <meta
            name='author'
            property='article:author'
            content='Theodorus Clarence'
          />
        </>
      )}

      {/* Favicons */}
      {FAVICONS.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/favicon/ms-icon-144x144.png'
      />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  )
}
