import React from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { useLocalStorage } from '@rehooks/local-storage'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

import client from '../gw2client'
import { fetcher, slugify } from '../utils'

const FISHING_ACHIEVEMENT_IDS = [6336, 6342, 6258, 6506, 6179, 6330, 6068, 6344, 6363, 6489, 6317, 6106, 6224, 6471, 6264, 6192, 6466, 6402, 6153, 6484, 6263, 6475, 6227, 6339, 6509, 6250, 6110, 6439, 6505]

export async function getStaticProps () {
  const fishingAchievements = await client.getFishingAchievements(FISHING_ACHIEVEMENT_IDS)

  return {
    props: {
      fishingAchievements: fishingAchievements.data
    }
  }
}

export default function HomePage ({ fishingAchievements }) {
  const [storedApiKey] = useLocalStorage('gw2f.api_key')
  const { accountAchievements } = useSWR(storedApiKey ? `https://api.guildwars2.com/v2/account/achievements?access_token=${storedApiKey}&ids=${FISHING_ACHIEVEMENT_IDS.join(',')}` : null, fetcher)

  return (
    <Layout>
      <Seo />

      {
        storedApiKey && (
          <section className='flex flex-col m-10 text-center layout'>
            <div className='flex justify-between mb-1'>
              <span className='text-base font-medium text-black'>Cod Swimming Amongst Mere Minnows</span>
              <span className='text-sm font-medium text-black'>0%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
              <div className='bg-blue-600 h-2.5 rounded-full' style={{ width: '0%' }} />
            </div>
          </section>
        )
      }

      <section className='flex flex-col m-10 text-center mt-14 layout'>
        <ul role='list' className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
          {fishingAchievements && <ZoneAchievements achievements={fishingAchievements} accountAchievements={accountAchievements} />}
        </ul>
      </section>
    </Layout>
  )
}

const ZONE_ACHIEVEMENT_NAMES = ['Seitung Province Fisher', 'Kaineng Fisher', 'Echovald Wilds Fisher', "Dragon's End Fisher", 'Krytan Fisher', 'Shiverpeaks Fisher', 'Ascalonian Fisher', 'Maguuma Fisher', 'Desert Fisher', 'Desert Isles Fisher', 'Orrian Fisher', 'Ring of Fire Fisher']

function ZoneAchievements ({ achievements, accountAchievements }) {
  const filteredAcheivements = achievements.filter(achievement => (
    ZONE_ACHIEVEMENT_NAMES.some(achievementName => (
      achievement.name.includes(achievementName)) && !achievement.name.includes('Avid')
    ))
  )

  return filteredAcheivements.map(achievement => {
    const accountAchievement = accountAchievements?.find(item => item.id == achievement.id)

    return (
      <li key={achievement.id} className='relative'>
        <a href={slugify(achievement.name)} className='group'>
          <div className='relative block overflow-hidden bg-gray-100 pointer-events-none h-28 aspect-w-10 aspect-h-7 md:h-28 lg:h-32 xl:h-40 group-hover:opacity-75'>
            <Image placeholder='blur' blurDataURL='6068-blur.png' src={`/${achievement.id}.jpg`} alt={`${achievement.name} Concept Art`} className='rounded-lg' layout='fill' />
          </div>
          <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none group-hover:opacity-75'>{achievement.name}</p>
          <p className='block text-sm font-medium text-gray-500 pointer-events-none group-hover:opacity-75'>{accountAchievement ? accountAchievement.bits.length : 0} / {achievement.bits.length}</p>
        </a>
      </li>
    )
  })
}
