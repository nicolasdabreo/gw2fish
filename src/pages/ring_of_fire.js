import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Clock from '../components/Clock'
import Fish from '../components/Fish'

import useApi from '../helpers/useApi'
import client from '../helpers/gw2client'
import { FISH_CATCH_DATA } from '../helpers/constants'
import { tyriaTimeOfDay } from '../helpers/time'


const FISH_IDS = [
  96547,
  96720,
  96589,
  96283,
  97471,
  96530,
  96595,
  96491,
  96597,
  96889,
  96555,
  97100,
  97498,
  96361,
]

export default function RingOfFire() {
  const fish = useApi(client.getFish)
  const timeOfDay = tyriaTimeOfDay()

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
        {fish.error && <p>{fish.error}</p>}
        <ul role='list' className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {fish.data && fish.data.map(fishItem => {
            const catchData = FISH_CATCH_DATA.find(catchData => catchData.Fish == fishItem.name)
            const available = ['Any', timeOfDay].includes(catchData.time)
            return available && <Fish available={true} fishItem={fishItem} catchData={catchData} />
          })}
        </ul>

        <ul role='list' className='grid grid-cols-1 gap-5 mt-20 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {fish.data && fish.data.map(fishItem => {
            const catchData = FISH_CATCH_DATA.find(catchData => catchData.Fish == fishItem.name)
            const available = ['Any', timeOfDay].includes(catchData.time)
            return !available && <Fish available={false} fishItem={fishItem} catchData={catchData} />
          })}
        </ul>
      </section>
    </Layout>
  )
}
