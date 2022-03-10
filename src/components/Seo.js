import * as React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const DEFAULTS = {
    title: 'GW2 Fish',
    siteName: '',
    description: '',

    /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
    url: '',
    type: 'website',
    robots: 'follow, index',

    /** No need to be filled, will be populated with openGraph function */
    image: '',
};

const FAVICONS = [
    {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png',
    },
    {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/favicon/android-icon-192x192.png',
    },
    {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/favicon/android-icon-512x512.png',
    },
    {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png',
    },
    {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png',
    },
];

export default function Seo(props) {
    const router = useRouter();
    const meta = DEFAULTS;

    return (
        <Head>
            <title>{meta.title}</title>
            <meta name='robots' content={meta.robots} />
            <meta content={meta.description} name='description' />
            <meta property='og:url' content={`${meta.url}${router.asPath}`} />
            <link rel='canonical' href={`${meta.url}${router.asPath}`} />

            {/* Open Graph */}
            <meta property='og:type' content={meta.type} />
            <meta property='og:site_name' content={meta.siteName} />
            <meta property='og:description' content={meta.description} />
            <meta property='og:title' content={meta.title} />
            <meta name='image' property='og:image' content={meta.image} />

            {/* Twitter */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='' />
            <meta name='twitter:title' content={meta.title} />
            <meta name='twitter:description' content={meta.description} />
            <meta name='twitter:image' content={meta.image} />
            {meta.date && (
                <>
                    <meta property='article:published_time' content={meta.date} />
                    <meta
                        name='publish_date'
                        property='og:publish_date'
                        content={meta.date}
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