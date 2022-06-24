import React, { useEffect, useState } from 'react'

export async function getServerSideProps ({req: req, params: {zone: zone}}) {
  const cookies = req.cookies;
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

export default function Achievement (props) {
  return (
    <Layout>
      <Seo meta={{title: zone.name}} />

    </Layout>
  )
}
