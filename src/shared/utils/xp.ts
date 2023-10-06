import { XpMerkleTreeItem, XpMerkleTree } from "shared/types/xp"
import { isSameAddress, normalizeAddress } from "shared/utils"

type DynamicXPMerkleTreeImport = {
  default: XpMerkleTree
}

export async function getRealmXpData({
  id,
  address,
}: {
  id?: string
  address?: string
}): Promise<XpMerkleTree | null> {
  if (!id && !address) {
    throw new Error("Missing realm id and address")
  }

  let xpData: null | DynamicXPMerkleTreeImport = null

  if (id) {
    try {
      xpData = await import(`data/xp/xp_${id}.json`)
    } catch (error) {
      // nothing serious yet, let's try with address
    }
  }

  if (address && !xpData) {
    try {
      xpData = await import(`data/xp/xp_${normalizeAddress(address)}.json`)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(
        "No XP data found for the realm, address:",
        address,
        "id:",
        id
      )
    }
  }

  return xpData && (xpData.default as XpMerkleTree)
}

export function getUserXPRank(sortedData: XpMerkleTreeItem[], address: string) {
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

export function getRealmXPSorted(data: XpMerkleTree) {
  return Object.values(data.claims).sort(
    (a, b) => Number(b.amount) - Number(a.amount)
  )
}
