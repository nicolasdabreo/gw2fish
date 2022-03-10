import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

import useApi from '../helpers/useApi'
import client from '../helpers/gw2client'

export default function Maguuma() {
    const fish = useApi(client.getFish)

    useEffect(() => {
        fish.request();
    }, []);

    return (
        <Layout>
            {/* <Seo templateTitle='Home' /> */}
            <Seo />


            <section className='bg-white'>
                <div className='flex flex-col m-10 text-center layout'>

                    {fish.loading && <p>Achievements are loading!</p>}
                    {fish.error && <p>{fish.error}</p>}
                    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {fish.data && <p>loaded!</p>}
                    </ul>
                </div>
            </section>

        </Layout >
    )
}
