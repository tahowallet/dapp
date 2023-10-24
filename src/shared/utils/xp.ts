import { LeaderboardItemData, XPLeaderboard } from "shared/types"
import { XpMerkleTree } from "shared/types/xp"
import { isSameAddress, normalizeAddress } from "shared/utils/address"
import XP_DATA from "../../data/xp-data.json"

// TODO: remove mocks
import leaderboardMock from "../../data/xp/4/leaderboard.json"
import xpMock from "../../data/xp/4/1.json"

type XpDataType = {
  [realmId: string]: { leaderboard: string | null; xp: string[] }
}

export async function getRealmLeaderboardData(
  realmId: string
): Promise<XPLeaderboard | null> {
  if (!realmId) {
    throw new Error("Missing realm id")
  }

  let xpData: null | XPLeaderboard = null

  if (realmId) {
    try {
      const leaderboardUrl = (XP_DATA as XpDataType)[realmId]?.leaderboard

      if (!leaderboardUrl) {
        throw new Error("Missing leaderboard url")
      }
      // xpData = await (await fetch(leaderboardUrl)).json()
      xpData = leaderboardMock
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("No XP data found for the realm id:", realmId, error)
    }
  }

  return xpData
}

export async function getXpDataForRealmId(
  realmId: string
): Promise<XpMerkleTree[] | null> {
  if (!realmId) {
    throw new Error("Missing realm id")
  }

  let xpData: null | XpMerkleTree[] = null

  try {
    const xpLinks = (XP_DATA as XpDataType)[realmId]?.xp

    xpData = await Promise.all(
      xpLinks.map(async (url) => {
        // const data = await (await fetch(url)).json()
        const data = xpMock

        return data
      })
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("No XP data found for the url:", realmId, error)
  }

  return xpData
}

export function getUserLeaderboardRank(
  leaderboard: XPLeaderboard,
  address: string
): LeaderboardItemData | null {
  if (!address) return null

  const normalizedAddress = normalizeAddress(address)
  const index = leaderboard.findIndex((item) =>
    isSameAddress(item.beneficiary, normalizedAddress)
  )

  return index > -1 ? leaderboard[index] : null
}
