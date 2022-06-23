import React from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { useLocalStorage } from '@rehooks/local-storage'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

import client from '../gw2client'
import { fetcher, slugify } from '../utils'

const FISHING_ACHIEVEMENT_IDS = [6336, 6342, 6258, 6506, 6179, 6330, 6068, 6344, 6363, 6489, 6317, 6106, 6224, 6471, 6264, 6192, 6466, 6402, 6153, 6484, 6263, 6475, 6227, 6339, 6509, 6250, 6110, 6439, 6505, 6111]

export async function getStaticProps () {
  const fishingAchievements = await client.getFishingAchievements(FISHING_ACHIEVEMENT_IDS)

  return {
    props: {
      achievements: fishingAchievements.data
    }
  }
}

export default function HomePage ({ achievements }) {
  const [storedApiKey] = useLocalStorage('gw2f.api_key')
  const { data } = useSWR(storedApiKey ? `https://api.guildwars2.com/v2/account/achievements?access_token=${storedApiKey}&ids=${FISHING_ACHIEVEMENT_IDS.join(',')}` : null, fetcher, { fallbackData: null })

  return (
    <Layout>
      <Seo />

      {storedApiKey && <CSAMMProgressBar achievement={data?.find(a => a.id === 6111)} />}

      <section className='flex flex-col m-10 text-center mt-14 layout'>
        <ul role='list' className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
          {achievements
            .filter(a => !a.name.includes('Avid'))
            .sort(sorter)
            .map(achievement => {
              const achievementProgress = data?.find(a => a.id === achievement.id)

              return (
                <li key={achievement.id} className='relative'>
                  <a href={slugify(achievement.name)} className='group'>
                    <div className='relative block overflow-hidden bg-gray-100 pointer-events-none h-28 aspect-w-10 aspect-h-7 md:h-28 lg:h-32 xl:h-40 group-hover:opacity-75'>
                      <Image placeholder='blur' blurDataURL='6068-blur.png' src={`/${achievement.id}.jpg`} alt={`${achievement.name} Concept Art`} className='rounded-lg' layout='fill' />
                    </div>
                    <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none group-hover:opacity-75'>{achievement.name}</p>
                    <p className='block text-sm font-medium text-gray-500 pointer-events-none group-hover:opacity-75'>{achievementProgress ? achievementProgress.bits.length : 0} / {achievement.bits.length}</p>
                  </a>
                </li>
              )
            })}
        </ul>
      </section>
    </Layout>
  )
}

function CSAMMProgressBar ({ achievement }) {
  if (!achievement) {
    return null
  }

  const progressPercent = Math.round((achievement.current / achievement.max) * 100)

  return (
    <section className='flex flex-col m-10 text-center layout'>
      <div className='flex justify-between mb-1'>
        <span className='text-base font-medium text-black'>Cod Swimming Amongst Mere Minnows</span>
        <span className='text-sm font-medium text-black'>{progressPercent}%</span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
        <div className='bg-blue-600 h-2.5 rounded-full' style={{ width: progressPercent }} />
      </div>
    </section>
  )
}

const sorter = (a, b) => {
  const nameA = a.name.toUpperCase() // ignore upper and lowercase
  const nameB = b.name.toUpperCase() // ignore upper and lowercase
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  // names must be equal
  return 0
}
