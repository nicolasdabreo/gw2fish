import React from 'react'
import Image from 'next/image'

export default function Fish ({ fishItem, catchData, available }) {
  return (
    <li key={fishItem.name} className={`${available ? '' : 'opacity-50'} flex col-span-1 rounded-md shadow-sm`}>
      <Image src={fishItem.icon} className={`flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md aspect-square item-${fishItem.rarity.toLowerCase()}`} height='64' width='64' />
      <div className='flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md'>
        <div className='flex-1 px-4 py-2 text-sm truncate'>
          <a href='#' className='font-medium text-gray-900 hover:text-gray-600'>
            {fishItem.name}
          </a>
          <p className='text-gray-500'>{catchData.Bait}</p>
        </div>
        <div className='flex-shrink-0 pr-2' />
      </div>
    </li>
  )
}
