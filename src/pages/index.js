import React, { useEffect } from 'react'
import Image from 'next/image'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

import useApi from '../helpers/useApi'
import client from '../helpers/gw2client'

export default function HomePage () {
  const fishingAchievements = useApi(client.getFishingAchievements)

  useEffect(() => {
    fishingAchievements.request()
  }, [])

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <section className='flex flex-col m-10 text-center layout'>
        <div className='flex justify-between mb-1'>
          <span className='text-base font-medium text-black'>Cod Swimming Amongst Mere Minnows</span>
          <span className='text-sm font-medium text-black'>45%</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
          <div className='bg-blue-600 h-2.5 rounded-full' style={{ width: '45%' }} />
        </div>
      </section>

      <section className='flex flex-col m-10 text-center layout'>
        <h1 className='mb-8 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>Fisher Achievements</h1>
        {fishingAchievements.loading && <p>Achievements are loading!</p>}
        {fishingAchievements.error && <p>{fishingAchievements.error}</p>}
        <ul role='list' className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
          {fishingAchievements.data && <ZoneAchievements achievements={fishingAchievements.data} />}
        </ul>
      </section>
    </Layout>
  )
}

const ZONE_ACHIEVEMENT_NAMES = ['Seitung Province Fisher', 'Kaineng Fisher', 'Echovald Wilds Fisher', "Dragon's End Fisher", 'Krytan Fisher', 'Shiverpeaks Fisher', 'Ascalonian Fisher', 'Maguuma Fisher', 'Desert Fisher', 'Desert Isles Fisher', 'Orrian Fisher', 'Ring of Fire Fisher']

function ZoneAchievements ({ achievements }) {
  const filteredAcheivements = achievements.filter(achievement => (
    ZONE_ACHIEVEMENT_NAMES.some(achievementName => (
      achievement.name.includes(achievementName)) && !achievement.name.includes('Avid')
    ))
  )

  return filteredAcheivements.map(achievement => (
    <li key={achievement.id} className='relative'>
      <a href={slugify(achievement.name)} className='group'>
        <div className='relative block overflow-hidden bg-gray-100 pointer-events-none h-28 aspect-w-10 aspect-h-7 md:h-28 lg:h-32 xl:h-40 group-hover:opacity-75'>
          <Image priority src={`/${achievement.id}.jpg`} alt={`${achievement.name} Concept Art`} className='rounded-lg' layout='fill' />
        </div>
        <p className='block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none group-hover:opacity-75'>{achievement.name}</p>
        <p className='block text-sm font-medium text-gray-500 pointer-events-none group-hover:opacity-75'>0 / {achievement.bits.length}</p>
      </a>
    </li>
  ))
}

function slugify (string) {
  const newString = string.replace(' Fisher', '')
  return toSnakeCase(newString)
}

const toSnakeCase = str =>
  str &&
  str
    .replace(/[^\w\s]/gi, '')
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_')
