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

export async function getXpData(
  realmId: string,
  dropIndex: number
): Promise<XpMerkleTree | null> {
  if (!realmId) {
    throw new Error("Missing realm id")
  }

  let xpData: null | DynamicXPMerkleTreeImport = null

  if (realmId) {
    try {
      xpData = await import(
        `data/xp/${realmId}/xp_${realmId}_${dropIndex}.json`
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("No XP data found for the realm id:", realmId)
    }
  }

  return xpData && (xpData.default as XpMerkleTree)
}

export async function getUserXpByMerkleRoot(
  realmId: string,
  account: string
): Promise<XpByMerkleRoot> {
  const xpItemByMerkleRoot: XpByMerkleRoot = {}
  const normalizedAddress = normalizeAddress(account)
  let dropIndex = 1

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const xpData = await getXpData(realmId, dropIndex)

    if (!xpData) break

    const { merkleRoot } = xpData
    const userClaim = xpData.claims[normalizedAddress]

    if (userClaim) {
      xpItemByMerkleRoot[merkleRoot] = userClaim
    }

    dropIndex += 1
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
