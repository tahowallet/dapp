import { LeaderboardItemData, XpMerkleTreeItemData } from "shared/types"
import { XpMerkleTree, XpByMerkleRoot } from "shared/types/xp"
import { isSameAddress, normalizeAddress } from "shared/utils"

type DynamicXPMerkleTreeImport = {
  default: XpMerkleTree
}

export async function getRealmLeaderboardData(
  realmId: string
): Promise<XpMerkleTree | null> {
  if (!realmId) {
    throw new Error("Missing realm id")
  }

  let xpData: null | DynamicXPMerkleTreeImport = null

  if (realmId) {
    try {
      xpData = await import(`data/xp/${realmId}/leaderboard.json`)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("No XP data found for the realm id:", realmId)
    }
  }

  return xpData && (xpData.default as XpMerkleTree)
}

async function getXpData(url: string): Promise<XpMerkleTree | null> {
  if (!url) {
    throw new Error("Missing url")
  }

  let xpData: null | XpMerkleTree = null

  if (url) {
    // debugger
    try {
      xpData = await (await fetch(url)).json()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("No XP data found for the url:", url)
    }
  }
  return xpData && (xpData as XpMerkleTree)
}

export async function getUserXpByMerkleRoot(
  account: string,
  url: string
): Promise<XpByMerkleRoot> {
  const xpItemByMerkleRoot: XpByMerkleRoot = {}
  const normalizedAddress = normalizeAddress(account)

  const xpData = await getXpData(url)

  if (xpData) {
    try {
      const { merkleRoot } = xpData
      const userClaim = xpData.claims[normalizedAddress]

      if (userClaim) {
        xpItemByMerkleRoot[merkleRoot] = userClaim
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("Not a correct structure for XP data")
    }
  }

  return xpItemByMerkleRoot
}

export function getUserLeaderboardRank(
  sortedData: XpMerkleTreeItemData[],
  address: string
): LeaderboardItemData | null {
  if (!address) return null

  const normalizedAddress = normalizeAddress(address)
  const index = sortedData.findIndex((item) =>
    isSameAddress(item.beneficiary, normalizedAddress)
  )

  return index > -1
    ? {
        rank: index + 1,
        ...sortedData[index],
      }
    : null
}

export function getRealmXpSorted(data: XpMerkleTreeItemData[]) {
  return data.sort((a, b) => Number(b.amount) - Number(a.amount))
}

export function convertXpData(xpData: XpMerkleTree): XpMerkleTreeItemData[] {
  return Object.entries(xpData.claims).map(([beneficiary, data]) => ({
    beneficiary,
    ...data,
  }))
}
