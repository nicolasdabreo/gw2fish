import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import {useCookies} from 'react-cookie'
import { useRouter } from 'next/router';

import Layout from '../components/Layout'
import Seo from '../components/Seo'

import client from '../gw2client'
import { fetcher, slugify } from '../utils'

const FISHING_ACHIEVEMENT_IDS = [6336, 6342, 6258, 6506, 6179, 6330, 6068, 6344, 6363, 6489, 6317, 6106, 6224, 6471, 6264, 6192, 6466, 6402, 6153, 6484, 6263, 6475, 6227, 6339, 6509, 6250, 6110, 6439, 6505, 6111]

export async function getServerSideProps ({req: req}) {
  const fishingAchievements = await client.getFishingAchievements(FISHING_ACHIEVEMENT_IDS)
  let data = null;

  if (req.cookies['gw2f.api_key']) {
    const request = await client.getAccountFishingAchievements(req.cookies['gw2f.api_key'], FISHING_ACHIEVEMENT_IDS)
    data = request.data
  }

  return {
    props: {
      achievements: fishingAchievements.data,
      data: data
    }
  }
}

export default function HomePage ({ achievements, data }) {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('')
  const [accountName, setAccountName] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['gw2f.api_key']);

  const refreshData = () => {
    router.replace(router.asPath);
  }

  useEffect(() => {
    setApiKey(cookies['gw2f.api_key'])
    setAccountName(cookies['gw2f.account_name'])
    refreshData()
  }, [cookies])

  return (
    <Layout>
      <Seo meta={{title: 'Achievements'}}/>

      {apiKey && <CSAMMProgressBar achievement={data?.find(a => a.id === 6111)} />}

      <section className='flex flex-col m-10 text-center mt-14 layout'>
        <ul role='list' className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8'>
          {achievements
            .filter(a => !a.name.includes('Avid'))
            .sort(sorter)
            .map(achievement => {
              const achievementProgress = data?.find(a => a.id === achievement.id)

              if (achievementProgress?.done) {
                const avidAchievement = achievements.find(a => a.name == `Avid ${achievement.name}`)
                const avidAchievementProgress = data?.find(a => a.id === avidAchievement.id)
                
                return <Achievement key={avidAchievement.id} achievement={avidAchievement} progress={avidAchievementProgress} image={`/${achievement.id}.jpg`} />
              } else {
                return <Achievement key={achievement.id} achievement={achievement} progress={achievementProgress} image={`/${achievement.id}.jpg`} />
              }
            })}
        </ul>
      </section>
    </Layout>
  )
}

function Achievement({achievement, progress, image}) {
  return (
    <li key={achievement.id} className='relative'>
      <a href={`/achievements/${slugify(achievement.name)}`} className='group'>
        <div className='relative block h-48 max-w-sm mx-auto overflow-hidden bg-gray-100 pointer-events-none dark:bg-slate-800 aspect-w-10 aspect-h-7 group-hover:opacity-75'>
          <Image placeholder='blur' blurDataURL='6068-blur.png' src={image} alt={`${achievement.name} Concept Art`} className='object-cover rounded-lg' layout='fill' />
        </div>
        <p className='block mt-2 text-base font-medium truncate pointer-events-none group-hover:opacity-75'>{achievement.name}</p>
        <p className='block text-sm font-medium pointer-events-none text-slate-500 dark:text-slate-400 group-hover:opacity-75'>{progress ? progress.bits.length : 0} / {achievement.bits.length}</p>
      </a>
    </li>
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
        <span className='text-base font-medium text-slate-900 dark:text-white'>Cod Swimming Amongst Mere Minnows</span>
        <span className='text-sm font-medium text-slate-900 dark:text-white'>{progressPercent}%</span>
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
