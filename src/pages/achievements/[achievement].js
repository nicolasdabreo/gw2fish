import React, { useEffect, useState } from 'react'

import { ClockIcon, CogIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { MoonIcon, SunIcon, BugAntIcon } from '@heroicons/react/24/solid'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import Switch from '../../components/Switch'
import Clock from '../../components/Clock'

import client from '../../gw2client'
import { DATA, TIMEZONES } from '../../data'
import { tyriaTimeOfDay, fetcher, underscore, zipAndMerge } from '../../utils'

export async function getServerSideProps ({req: req, params: {achievement: achievementName}}) {
  const achievementData = DATA[achievementName]
  const fishItems = await client.getFish(achievementData.fish.map(f => f.id))
  achievementData.fish = zipAndMerge(achievementData.fish, fishItems.data).filter(x => x)
  achievementData.progress = {}

  if (req.cookies['gw2f.api_key']) {
    const request = await client.getAccountFishingAchievements(req.cookies['gw2f.api_key'], [achievementData.achievement_id])
    achievementData.progress = request.data[0]
  }

  return {
    props: {
      achievement: achievementData
    }
  }
}

export default function Achievement ({ achievement }) {
  const [showSeparately, setShowSeparately] = useState(false)
  const [showCaught, setShowCaught] = useState(false)
  const [fish, setFish] = useState(achievement.fish);

  useEffect(() => {
    setFish(maybeFilterCaught(achievement, showCaught))
  }, [showCaught])

  return (
    <Layout>
      <Seo meta={{title: achievement.name}} />

      <section className='flex flex-col justify-end m-10 sm:flex-row layout'>
        <Clock timezone={TIMEZONES.tyria} />
      </section>

      <section className='flex flex-col m-10 text-left layout'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-3xl leading-7 truncate'>{achievement.name}</h1>

          <SettingsMenu
            showCaught={showCaught}
            setShowCaught={setShowCaught}
            showSeparately={showSeparately}
            setShowSeparately={setShowSeparately} 
          />
        </div>
      </section>

      <section className='flex flex-col m-10 layout'>
        <ul role='list' className='grid grid-cols-1 gap-5 mt-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {fish.map(f => <Fish key={f.id} fish={f} />)}
        </ul>
      </section>
    </Layout>
  )
}

function SettingsMenu ({showCaught, setShowCaught, showSeparately, setShowSeparately}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as="div" className="px-2 pt-1 pb-2 rounded-md cursor-pointer dark:bg-gray-900 dark:hover:bg-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-indigo-500">
          <CogIcon className="inline-flex justify-center w-5 h-5 font-medium text-gray-700 text-base dark:text-white" />
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-2">
            <div className="px-3 py-2">
              <Switch
                label='Show caught'
                value={showCaught}
                handleToggle={setShowCaught}
              />
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function Fish({fish}) {
  const timeOfDay = tyriaTimeOfDay()
  
  return (
    <li key={fish.name} className={`${['Any', timeOfDay].includes(fish.time) ? '' : 'opacity-50'} bg-white dark:bg-gray-900 dark:text-white flex col-span-1 rounded-md shadow-sm`}>
      <div className='flex flex-row justify-between w-full border-t border-b border-r rounded-md border-slate-900'>
        <div className='flex items-center justify-between flex-1 truncate'>
          <div className='flex self-center flex-shrink-0 pl-2'>
            <Image src={fish.icon} className={`flex-shrink-0 w-full h-full flex items-center justify-center text-white text-base font-medium aspect-square item-${fish.rarity.toLowerCase()}`} height='64' width='64' />
          </div>
          <div className='flex-1 px-4 py-2 truncate text-base'>
            <a href={`https://wiki.guildwars2.com/wiki/${underscore(fish.name)}`} className='font-medium text-gray-900 dark:text-white hover:text-gray-600'>
              {fish.name}
            </a>
            <p className='text-gray-500 truncate dark:text-gray-300'>
              <BugAntIcon className='text-gray-900 dark:text-white inline-block w-4 h-4 ml-[-2px] mr-2 opacity-60' />
              {fish.bait}
            </p>
            <p className='text-gray-500 truncate dark:text-gray-300'>
              <MapPinIcon className='text-gray-900 dark:text-white inline-block w-5 h-5 mr-1 ml-[-4px]' /> 
              {fish.hole}
            </p>
          </div>
          <div className='flex-shrink-0 pr-2' />
        </div>


        <div className='flex px-4 py-2 text-left truncate text-base'>
          <ClockIcon className='w-5 h-5 mr-2' />
          {fish.time}
        </div>
      </div>
    </li>
  )
}

function maybeFilterCaught(achievement, showCaught) {
  if (showCaught || Object.keys(achievement.progress).length === 0) {
    return achievement.fish;
  } 

  let uncaughtFishIds = [];

  console.log(!!achievement.progress)

  const ids = achievement.fish.filter((_fish, fishIndex) => !achievement.progress.bits.includes(fishIndex)).map(bit => bit.id)
  uncaughtFishIds = [...uncaughtFishIds, ...ids]

  return achievement.fish.filter(fishItem => uncaughtFishIds.includes(fishItem.id))
}
