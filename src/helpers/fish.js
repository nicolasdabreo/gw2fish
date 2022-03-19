export function filterCaughtFish(fish, showCaught, fishingAchievements, accountAchievements) {
    if (showCaught || !accountAchievements) {
        return fish;
    }

    let uncaughtFishIds = [];

    accountAchievements.forEach(accountAchievement => {
        fishingAchievements.forEach(fishingAchievement => {
            if (accountAchievement.id == fishingAchievement.id) {
                const ids = fishingAchievement.bits.filter((_bit, bitIndex) => !accountAchievement.bits.includes(bitIndex)).map(bit => bit.id)
                uncaughtFishIds = [...uncaughtFishIds, ...ids]
            }
        });
    });

    return fish.filter(fishItem => uncaughtFishIds.includes(fishItem.id))
}