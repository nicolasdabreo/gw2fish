import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Clock from '../components/Clock'
import Fish from '../components/Fish'
import Spinner from '../components/Spinner'

import useApi from '../helpers/useApi'
import client from '../helpers/gw2client'
import { FISH_CATCH_DATA } from '../helpers/constants'
import { tyriaTimeOfDay } from '../helpers/time'

const FISH_IDS = [
  97369,
  96085,
  95794,
  97756,
  97746,
  96513,
  96225,
  95890,
  96397,
  97844,
  97001,
  97443,
  95849,
  97489
]

export default function DesertIsles () {
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
        {fish.loading && <Spinner />}
        <ul role='list' className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {fish.data && fish.data.map(fishItem => {
            const catchData = FISH_CATCH_DATA.find(catchData => catchData.Fish == fishItem.name)
            const available = ['Any', timeOfDay].includes(catchData.time)
            return available && <Fish available fishItem={fishItem} catchData={catchData} />
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
