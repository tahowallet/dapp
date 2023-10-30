import { LeaderboardItemData, XPLeaderboard } from "shared/types"
import {
  XpMerkleTree,
  XpMerkleTreeClaims,
  XpMerkleTreeGlossary,
} from "shared/types/xp"
import { isSameAddress, normalizeAddress } from "shared/utils/address"
import XP_DATA from "../../assets/xp-data.json"

// eslint-disable-next-line prefer-destructuring
const XP_HOSTING_BASE_URL = process.env.XP_HOSTING_BASE_URL

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
        return null
      }
      if (process.env.NODE_ENV === "development") {
        xpData = (
          await import(
            /* webpackInclude: /\.json$/ */ `../../../src${leaderboardUrl}`
          )
        ).default
      } else {
        xpData = await (
          await fetch(`${XP_HOSTING_BASE_URL}${leaderboardUrl}`)
        ).json()
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("No XP data found for the realm id:", realmId, error)
    }
  }

  return xpData
}

export async function getXpDataForRealmId(
  realmId: string,
  account: string
): Promise<XpMerkleTree[]> {
  if (!realmId) {
    throw new Error("Missing realm id")
  }

  const normalizedAddress = normalizeAddress(account)

  const targetAddress = BigInt(normalizedAddress)
  let xpData: (null | XpMerkleTree)[] = []

  try {
    const xpLinks = (XP_DATA as XpDataType)[realmId]?.xp

    if (!xpLinks || !xpLinks.length) {
      return []
    }

    xpData = await Promise.all(
      xpLinks.map(async (url) => {
        let glossaryFile: XpMerkleTreeGlossary

        if (process.env.NODE_ENV === "development") {
          glossaryFile = (
            await import(/* webpackInclude: /\.json$/ */ `../../../src${url}`)
          ).default
        } else {
          glossaryFile = await (
            await fetch(`${XP_HOSTING_BASE_URL}${url}`)
          ).json()
        }

        if (!glossaryFile) {
          throw new Error(`Failed to fetch glossaryFile from ${url}`)
        }

        const claimLink = glossaryFile.glossary.find(
          ({ startAddress }) => BigInt(startAddress ?? 0) >= targetAddress
        )?.file

        if (!claimLink) {
          throw new Error(`Failed to find claim link for ${normalizedAddress}`)
        }

        const claims = (await (
          await fetch(`${XP_HOSTING_BASE_URL}${claimLink}`)
        ).json()) as XpMerkleTreeClaims | undefined

        if (!claims) {
          throw new Error(`Failed to fetch claims from ${claimLink}`)
        }

        const userClaim = claims[normalizedAddress]

        return userClaim
          ? ({
              totalAmount: glossaryFile.totalAmount,
              merkleRoot: glossaryFile.merkleRoot,
              merkleDistributor: glossaryFile.merkleDistributor,
              claims: {
                [normalizedAddress]: userClaim,
              },
            } as XpMerkleTree)
          : null
      })
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("No XP data found for the realm id:", realmId, error)
  }

  return xpData.flatMap((item) => (item ? [item] : []))
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
