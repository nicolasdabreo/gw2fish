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
  const [storedApiKey] = useLocalStorage('gw2f.api_key')
  const [showSeparately, setShowSeparately] = useState(false)
  const [showCaught, setShowCaught] = useState(false)
  const fishingAchievements = useApi(client.getFishingAchievements)
  const accountAchievements = useApi(client.getAccountFishingAchievements)

  useEffect(() => {
    fish.request([...SEITUNG_FISH_IDS, ...WORLD_FISH_IDS])
    fishingAchievements.request([6336, 6224, 6471, 6439, 6505])
  }, [])

  useEffect(() => {
    accountAchievements.request(storedApiKey, [6336, 6224, 6471, 6439, 6505])
  }, [storedApiKey])

  return (
    <Layout title='Seitung Province'>
      <Seo />

      <section className='flex flex-row items-end justify-between m-10 text-right layout'>
        <div className='flex flex-col mb-2 space-x-0 space-y-2 md:space-x-4 md:space-y-0 md:flex-row md:mb-0'>
          <Switch
            label='Show separately'
            value={showSeparately}
            handleToggle={setShowSeparately}
          />
          <Switch
            label='Show caught'
            value={showCaught}
            handleToggle={setShowCaught}
          />
        </div>
        <Clock />
      </section>

      {fish.data && fishingAchievements.data
        ? (
          <>
            <section className='flex flex-col m-10 text-left layout'>
              <h2 className='text-xs font-medium tracking-wide text-gray-500 uppercase'>Zone Fish</h2>
              {showSeparately
                ? (
                  <SplitFishList
                    fish={filterCaughtFish(fish.data, showCaught, fishingAchievements.data, accountAchievements.data)}
                    zoneCatchData={SEITUNG_FISH_CATCH_DATA}
                  />
                )
                : (
                  <FishList
                    fish={filterCaughtFish(fish.data, showCaught, fishingAchievements.data, accountAchievements.data)}
                    zoneCatchData={SEITUNG_FISH_CATCH_DATA}
                  />
                )}
            </section>

            <section className='flex flex-col m-10 text-left layout'>
              <h2 className='text-xs font-medium tracking-wide text-gray-500 uppercase'>World Fish</h2>
              {showSeparately
                ? (
                  <SplitFishList
                    fish={filterCaughtFish(fish.data, showCaught, fishingAchievements.data, accountAchievements.data)}
                    zoneCatchData={WORLD_FISH_CATCH_DATA}
                    showCaught={showCaught}
                  />
                )
                : (
                  <FishList
                    fish={filterCaughtFish(fish.data, showCaught, fishingAchievements.data, accountAchievements.data)}
                    zoneCatchData={WORLD_FISH_CATCH_DATA}
                    showCaught={showCaught}
                  />
                )}
            </section>
          </>
        )
        : (
          'Loading...'
        )}
    </Layout>
  )
}

function filterCaughtFish(fish, showCaught, fishingAchievements, accountAchievements) {
  if (showCaught || !accountAchievements) {
    return fish;
  }

  let uncaughtFishIds = [];

  accountAchievements.forEach(accountAchievement => {
    fishingAchievements.forEach(fishingAchievement => {
      if (accountAchievement.id == fishingAchievement.id) {
        const ids = fishingAchievement.bits.filter((_bit, bitIndex) => !accountAchievement.bits.includes(bitIndex)).map(bit => bit.id)
        uncaughtFishIds = [...uncaughtFishIds, ...ids]
      }
    });
  });

  return fish.filter(fishItem => uncaughtFishIds.includes(fishItem.id))
}
