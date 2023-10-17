import { LeaderboardItemData } from "shared/types"
import { XpMerkleTreeItem, XpMerkleTree, XpByMerkleRoot } from "shared/types/xp"
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

async function getXpData(
  realmId: string,
  url: string
): Promise<XpMerkleTree | null> {
  if (!realmId) {
    throw new Error("Missing realm id")
  }

  let xpData: null | DynamicXPMerkleTreeImport = null

  if (realmId) {
    try {
      xpData = await (await fetch(url)).json()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("No XP data found for the realm id:", realmId)
    }
  }

  return xpData && (xpData.default as XpMerkleTree)
}

export async function getUserXpByMerkleRoot(
  realmId: string,
  account: string,
  url: string
): Promise<XpByMerkleRoot> {
  const xpItemByMerkleRoot: XpByMerkleRoot = {}
  const normalizedAddress = normalizeAddress(account)

  const xpData = await getXpData(realmId, url)

  if (xpData) {
    const { merkleRoot } = xpData
    const userClaim = xpData.claims[normalizedAddress]

    if (userClaim) {
      xpItemByMerkleRoot[merkleRoot] = userClaim
    }
  }

  return xpItemByMerkleRoot
}

export function getUserLeaderboardRank(
  sortedData: XpMerkleTreeItem[],
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

export function getRealmXpSorted(data: XpMerkleTree) {
  return Object.values(data.claims).sort(
    (a, b) => Number(b.amount) - Number(a.amount)
  )
}
