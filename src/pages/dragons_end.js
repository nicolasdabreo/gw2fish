import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Clock from '../components/Clock'
import Fish from '../components/Fish'

import useApi from '../helpers/useApi'
import client from '../helpers/gw2client'
import { FISH_CATCH_DATA } from '../helpers/constants'

const FISH_IDS = [
  97240,
  97814,
  97853,
  97183,
  96443,
  96181,
  96817,
  96913,
  95729,
  95670,
  96076,
  97794,
  95699,
  95632,
]

export default function DragonsEnd() {
  const fish = useApi(client.getFish)

  useEffect(() => {
    fish.request(FISH_IDS)
  }, [])

  return (
    <Layout>
      <Seo />

      <section className='flex flex-col m-10 text-right layout'>
        <Clock />
      </section>

      <section className='flex flex-col m-10 text-left layout'>
        <h2 className='mb-4 text-sm font-medium tracking-wide text-gray-700 uppercase'>Available Fish</h2>
        {fish.error && <p>{fish.error}</p>}
        <ul role='list' className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {fish.data && fish.data.map(fishItem => {
            const catchData = FISH_CATCH_DATA.find(catchData => catchData.Fish == fishItem.name)
            return <Fish fishItem={fishItem} catchData={catchData} />
          })}
        </ul>
      </section>

      <section className='flex flex-col m-10 text-left layout'>
        <h2 className='mb-4 text-sm font-medium tracking-wide text-gray-700 uppercase'>Unavailable Fish</h2>
        {fish.error && <p>{fish.error}</p>}
        <ul role='list' className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {fish.data && fish.data.map(fishItem => { })}
        </ul>
      </section>
    </Layout>
  )
}
