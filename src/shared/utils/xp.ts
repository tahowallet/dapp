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
  [realmId: string]: {
    rootFolder?: string
    claimsFolder?: string
    leaderboard: string | null
    xpGlossary: string[]
  }
}

async function fetchOrImport(url: string) {
  if (process.env.NODE_ENV === "development") {
    // We need to give webpack a hint where these files are located in the filesystem
    // so we remove parts of the path and file extension - including this directly in a dynamic import
    // string template will make webpack include all files in the bundle
    const fileWithoutExtension = url
      .replace("/assets/xp/", "")
      .replace(/.json$/, "")
    return (
      await import(
        /* webpackInclude: /\.json$/ */ `../../../src/assets/xp/${fileWithoutExtension}.json`
      )
    ).default
  }
  // For production we fetch the data from the XP hosting server - by default we can use
  // json files from "assets" folder as they are copied to the build folder during the build process
  return (await fetch(`${XP_HOSTING_BASE_URL}${url}`)).json()
}

export async function getRealmLeaderboardData(
  realmId: string
): Promise<XPLeaderboard | null> {
  if (!realmId) {
    throw new Error("Missing realm id")
  }

  const xpData = (XP_DATA as XpDataType)[realmId]

  if (!xpData) {
    throw new Error("Missing data in xp-data.json")
  }

  const { rootFolder, leaderboard } = xpData

  if (!rootFolder || !leaderboard) {
    return null
  }

  const leaderboardUrl = `${rootFolder}/${leaderboard}`

  try {
    return await fetchOrImport(leaderboardUrl)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("No leaderboard data found for the realm id:", realmId, error)

    return null
  }
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
  let claimsData: (null | XpMerkleTree)[] = []

  const xpData = (XP_DATA as XpDataType)[realmId]

  try {
    const { rootFolder, claimsFolder, xpGlossary } = xpData

    if (!rootFolder || !claimsFolder || !xpGlossary || !xpGlossary.length) {
      return []
    }

    claimsData = await Promise.all(
      xpGlossary.map(async (file) => {
        const glossaryUrl = `${rootFolder}/${file}`

        const glossaryFile: XpMerkleTreeGlossary = await fetchOrImport(
          glossaryUrl
        )

        if (!glossaryFile) {
          throw new Error(`Failed to fetch glossaryFile from ${glossaryUrl}`)
        }

        // Addresses in the claim files are sorted in ascending order,
        // we only know about the address that the file starts with and our `targetAddress`.
        // * If `startAddress` < `targetAddress` then we don't know if the address
        //   is in the current claim file or the next one. We assume that it's
        //   in the one of the upcoming files.
        // * If `startAddress` > `targetAddress` then we know that the address
        //   is in the previous file.
        // * If this heuristic produces no matching entry, then the last file
        //   is the only one that could include the address.
        const claimFileEntry =
          glossaryFile.glossary.find(
            (_, i, glossary) =>
              // If the next glossary entry's start address > the target, this
              // file will contain the claim or there is no claim.
              BigInt(glossary[i + 1]?.startAddress ?? 0) > targetAddress
          ) ?? glossaryFile.glossary.slice(-1)[0] // default to the last entry if no other entry is found
        const claimFile = claimFileEntry?.file

        if (!claimFile) {
          // No claim file found for the user
          return null
        }

        const claimLink = `${claimsFolder}${claimFile}`

        const claims: XpMerkleTreeClaims | undefined = await fetchOrImport(
          claimLink
        )

        if (!claims) {
          throw new Error(`Failed to fetch claims from ${claimLink}`)
        }

        const userClaim = claims[normalizedAddress]

        if (userClaim) {
          return {
            totalAmount: glossaryFile.totalAmount,
            merkleRoot: glossaryFile.merkleRoot,
            merkleDistributor: glossaryFile.merkleDistributor,
            claims: {
              [normalizedAddress]: userClaim,
            },
          } as XpMerkleTree
        }

        // No claim found for the user
        return null
      })
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("No XP data found for the realm id:", realmId, error)
  }

  return claimsData.flatMap((item) => (item ? [item] : []))
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
