import React from 'react'
import Image from 'next/image'

import { tyriaTimeOfDay } from '../helpers/time'

export function SplitFishList({ fish, zoneCatchData, showCaught }) {
  const timeOfDay = tyriaTimeOfDay()

  return (
    <>
      <ul role='list' className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {fish && sortFish(fish, zoneCatchData).map(fishItem => {
          const catchData = zoneCatchData.find(catchData => catchData.name == fishItem.name)

          if (catchData) {
            const available = ['Any', timeOfDay].includes(catchData.time)
            return available && <Fish key={fishItem.id} available={available} fishItem={fishItem} catchData={catchData} />
          }
        })}
      </ul>

      <ul role='list' className='grid grid-cols-1 gap-5 mt-20 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {fish && sortFish(fish, zoneCatchData).map(fishItem => {
          const catchData = zoneCatchData.find(catchData => catchData.name == fishItem.name)

          if (catchData) {
            const available = ['Any', timeOfDay].includes(catchData.time)
            return !available && <Fish key={fishItem.id} available={false} fishItem={fishItem} catchData={catchData} />
          }
        })}
      </ul>
    </>
  )
}

export function FishList({ fish, zoneCatchData, showCaught }) {
  const timeOfDay = tyriaTimeOfDay()

  return (
    <ul role='list' className='grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      {fish && sortFish(fish, zoneCatchData).map(fishItem => {
        const catchData = zoneCatchData.find(catchData => catchData.name == fishItem.name)
        if (catchData) {
          const available = ['Any', timeOfDay].includes(catchData.time)
          return <Fish key={fishItem.id} available={available} fishItem={fishItem} catchData={catchData} />
        }
      })}
    </ul>
  )
}

function Fish({ fishItem, catchData, available }) {
  return (
    <li key={fishItem.name} className={`${available ? '' : 'opacity-50'} bg-white flex col-span-1 rounded-md shadow-sm`}>
      <div className='flex items-center justify-between flex-1 truncate border-t border-b border-r border-gray-200 rounded-md'>
        <div className='flex self-center pl-2'>
          <Image src={fishItem.icon} className={`flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium aspect-square item-${fishItem.rarity.toLowerCase()}`} height='64' width='64' />
        </div>
        <div className='flex-1 px-4 py-2 text-sm truncate'>
          <a href='#' className='font-medium text-gray-900 hover:text-gray-600'>
            {fishItem.name}
          </a>
          <p className='text-gray-500'>{catchData.bait}</p>
          <p className='text-gray-500'>{catchData.hole}</p>
        </div>
        <div className='flex-shrink-0 pr-2' />
      </div>
    </li>
  )
}

function sortFish(fish, sortArr) {
  return fish.sort((a, b) => sortArr.indexOf(a.name) - sortArr.indexOf(b.name))
}
