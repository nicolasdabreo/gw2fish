import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.guildwars2.com/v2'
})

async function validateToken (token) {
  return await apiClient.get(`/tokeninfo?access_token=${token}`)
}

async function getAccount (token) {
  return await apiClient.get(`/account?access_token=${token}`)
}

async function getFishingAchievements (ids) {
  return await apiClient.get(`/achievements?ids=${ids.join()}`)
}

async function getAccountFishingAchievements (token, ids) {
  if (!token) {
    return null
  }

  return await apiClient.get(`/account/achievements?access_token=${token}&ids=${ids.join()}`)
}

async function getFish (fishIds) {
  return await apiClient.get(`/items?ids=${fishIds.join()}`)
}

export default {
  validateToken,
  getAccount,
  getFishingAchievements,
  getAccountFishingAchievements,
  getFish
}
