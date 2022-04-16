import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { useLocalStorage } from '@rehooks/local-storage'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Switch from '../components/Switch'
import Clock from '../components/Clock'

import client from '../gw2client'
import { DATA } from '../data'
import { tyriaTimeOfDay, fetcher, underscore, zipAndMerge } from '../utils'

export async function getStaticPaths() {
  const paths = Object.keys(DATA).map((zoneSlug) => ({
    params: {zone: zoneSlug}
  }))

  return { paths, fallback: false}
}

export async function getStaticProps ({ params: { zone } }) {
  const zoneData = DATA[zone]
  const fishItems = await client.getFish(zoneData.fish.map(f => f.id))
  zoneData.fish = zipAndMerge(zoneData.fish, fishItems.data).filter(x => x)
  const fishingAchievements = await client.getFishingAchievements(zoneData.achievements)

  return {
    props: {
      zone: zoneData,
      achievements: fishingAchievements.data
    }
  }
}

export default function Zone ({ zone, achievements }) {
  const [showSeparately, setShowSeparately] = useState(false)
  const [showCaught, setShowCaught] = useState(false)
  const [storedApiKey] = useLocalStorage('gw2f.api_key')
  const { data } = useSWR(storedApiKey ? `https://api.guildwars2.com/v2/account/achievements?access_token=${storedApiKey}&ids=${zone.achievements.join(',')}` : null, fetcher, {fallbackData: null})
  const timeOfDay = tyriaTimeOfDay()

  return (
    <Layout title={zone.name}>
      <Seo />

      <section className='flex flex-row items-end justify-between m-10 text-right layout'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col mb-2 space-x-0 space-y-2 md:space-x-4 md:space-y-0 md:flex-row md:mb-0'>
            <Switch
              label='Show separately'
              value={showSeparately}
              handleToggle={setShowSeparately}
            />
            {storedApiKey && (
              <Switch
                label='Show caught'
                value={showCaught}
                handleToggle={setShowCaught}
              />
            )}
          </div>
        </div>

        <Clock />
      </section>

      <section className='flex flex-col m-10 text-left layout'>
        <ul role='list' className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {
            maybeFilterCaught(showCaught, zone.fish, achievements,data)
              .map(f => (
                <li key={f.name} className={`${['Any', timeOfDay].includes(f.time) ? '' : 'opacity-50'} bg-white flex col-span-1 rounded-md shadow-sm`}>
                  <div className='flex items-center justify-between flex-1 truncate border-t border-b border-r border-gray-200 rounded-md'>
                    <div className='flex self-center pl-2'>
                      <Image src={f.icon} className={`flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium aspect-square item-${f.rarity.toLowerCase()}`} height='64' width='64' />
                    </div>
                    <div className='flex-1 px-4 py-2 text-sm truncate'>
                      <a href={`https://wiki.guildwars2.com/wiki/${underscore(f.name)}`} className='font-medium text-gray-900 hover:text-gray-600'>
                        {f.name}
                      </a>
                      <p className='text-gray-500'>{f.bait}</p>
                      <p className='text-gray-500'>{f.hole}</p>
                    </div>
                    <div className='flex-shrink-0 pr-2' />
                  </div>
                </li>
              )
            )
          }
        </ul>
      </section>
    </Layout>
  )
}

function maybeFilterCaught(showCaught, fish, achievements, achievementsProgress) {
  if (showCaught || !achievementsProgress) {
    return fish;
  } 

  let uncaughtFishIds = [];

  achievementsProgress.forEach(progress => {
      achievements.forEach(achievement => {
          if (progress.id == achievement.id) {
              const ids = achievement.bits.filter((_bit, bitIndex) => !progress.bits.includes(bitIndex)).map(bit => bit.id)
              uncaughtFishIds = [...uncaughtFishIds, ...ids]
          }
      });
  });

  return fish.filter(fishItem => uncaughtFishIds.includes(fishItem.id))
}
