import { LeaderboardItemData } from "shared/types"
import { XpMerkleTreeItem, XpMerkleTree } from "shared/types/xp"
import { isSameAddress, normalizeAddress } from "shared/utils"

type DynamicXPMerkleTreeImport = {
  default: XpMerkleTree
}

export async function getRealmXpData({
  id,
}: {
  id?: string
}): Promise<XpMerkleTree | null> {
  if (!id) {
    throw new Error("Missing realm id")
  }

  let xpData: null | DynamicXPMerkleTreeImport = null

  if (id) {
    try {
      xpData = await import(`data/xp/${id}/leaderboard.json`)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("No XP data found for the realm id:", id)
    }
  }

  return xpData && (xpData.default as XpMerkleTree)
}

export function getUserXpRank(
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
