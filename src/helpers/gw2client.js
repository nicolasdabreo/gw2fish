import axios from 'axios'

// const FISHING_ACHIEVEMENT_CATEGORY_ID = 317
const FISHING_ACHIEVEMENT_IDS = [6201, 6478, 6109, 6284, 6279, 6336, 6342, 6258, 6506, 6179, 6330, 6068, 6344, 6363, 6489, 6317, 6106, 6224, 6471, 6264, 6192, 6466, 6402, 6153, 6484, 6263, 6475, 6227, 6339, 6509, 6250, 6110, 6439, 6505]

const apiClient = axios.create({
  baseURL: 'https://api.guildwars2.com/v2'
})

async function validateToken(token) {
  return await apiClient.get(`/tokeninfo?access_token=${token}`)
}

async function getAccount(token) {
  return await apiClient.get(`/account?access_token=${token}`)
}

async function getFishingAchievements() {
  return await apiClient.get(`/achievements?ids=${FISHING_ACHIEVEMENT_IDS.join()}`)
}

async function getFish(fishIds) {
  return await apiClient.get(`/items?ids=${fishIds.join()}`)
}

export default {
  validateToken,
  getAccount,
  getFishingAchievements,
  getFish
}
