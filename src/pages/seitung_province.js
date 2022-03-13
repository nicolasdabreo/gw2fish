import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Switch from '../components/Switch'
import Clock from '../components/Clock'
import { SplitFishList, FishList } from '../components/FishList'

import useApi from '../helpers/useApi'
import client from '../helpers/gw2client'
import { SEITUNG_FISH_CATCH_DATA, WORLD_FISH_CATCH_DATA, SEITUNG_FISH_IDS, WORLD_FISH_IDS } from '../helpers/constants'

export default function SeitungProvince() {
  const fish = useApi(client.getFish)
  const [storedApiKey] = useLocalStorage("gw2f.api_key")
  const [showSeparately, setShowSeparately] = useState(false)
  const [showCaught, setShowCaught] = useState(false)
  const fishingAchievements = useApi(client.getFishingAchievements)
  const accountFishingAchievements = useApi(client.getAccountFishingAchievements)

  useEffect(() => {
    fish.request([...SEITUNG_FISH_IDS, ...WORLD_FISH_IDS])
    fishingAchievements.request([6336, 6224, 6471, 6439, 6505])
  }, [])

  useEffect(() => {
    accountFishingAchievements.request(storedApiKey, [6336, 6224, 6471, 6439, 6505])
  }, [storedApiKey])

  return (
    <Layout title={'Seitung Province'}>
      <Seo />

      <section className='flex flex-row items-end justify-between m-10 text-right layout'>
        <div className='flex flex-col mb-2 space-x-0 space-y-2 md:space-x-4 md:space-y-0 md:flex-row md:mb-0'>
          <Switch label={'Show separately'} value={showSeparately} handleToggle={setShowSeparately} />
          <Switch label={'Show caught'} />
        </div>
        <Clock />
      </section>

      {fish.data ? (
        <>
          <section className='flex flex-col m-10 text-left layout'>
            <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase">Zone Fish</h2>
            {showSeparately ? (
              <SplitFishList fish={fish.data} zoneCatchData={SEITUNG_FISH_CATCH_DATA} showCaught={showCaught} />
            ) : (
              <FishList fish={fish.data} zoneCatchData={SEITUNG_FISH_CATCH_DATA} showCaught={showCaught} />
            )}
          </section>

          <section className='flex flex-col m-10 text-left layout'>
            <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase">World Fish</h2>
            {showSeparately ? (
              <SplitFishList fish={fish.data} zoneCatchData={WORLD_FISH_CATCH_DATA} showCaught={showCaught} />
            ) : (
              <FishList fish={fish.data} zoneCatchData={WORLD_FISH_CATCH_DATA} showCaught={showCaught} />
            )}
          </section>
        </>
      ) : (
        "Loading..."
      )}
    </Layout>
  )
}
