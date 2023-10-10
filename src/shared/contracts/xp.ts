import { Contract, ethers, providers } from "ethers"
import {
  ReadTransactionBuilder,
  UnclaimedXpData,
  WriteTransactionBuilder,
  XpByMerkleRoot,
  XpDistributor,
  XpMerkleTreeItem,
} from "shared/types"
import { isSameAddress, normalizeAddress } from "shared/utils"
import {
  xpMerkleDistributorAbi,
  xpAbi,
  xpMerkleDistributorFactoryAbi,
} from "./abi"
import { getRealmContract } from "./realms"

import { getGameContract } from "./game"

export const getXpMerkleDistributorContract: ReadTransactionBuilder<
  { distributorContractAddress: string },
  Contract
> = async (provider, { distributorContractAddress }) =>
  new Contract(distributorContractAddress, xpMerkleDistributorAbi, provider)

export const hasClaimedXp: ReadTransactionBuilder<
  {
    distributorContractAddress: string
    index: number
  },
  boolean
> = async (provider, { distributorContractAddress, index }) => {
  const distributorContract = await getXpMerkleDistributorContract(provider, {
    distributorContractAddress,
  })

  const hasClaimed = await distributorContract.isClaimed(index)

  return hasClaimed
}

const getDistributorsFromEvents = (
  events: ethers.Event[],
  xpContractAddress: string
) =>
  events.flatMap<XpDistributor>((event) => {
    const { args } = event

    if (!args) return []

    const distributedXpAddress = args.xp

    if (!isSameAddress(distributedXpAddress, xpContractAddress)) {
      return []
    }

    return {
      distributorContractAddress: normalizeAddress(args.distributor),
      merkleRoot: args.merkleRoot,
    }
  })

export const getXPDistributorsAddresses: ReadTransactionBuilder<
  {
    realmContractAddress: string
    xpContractAddress: string
  },
  XpDistributor[]
> = async (provider, { realmContractAddress, xpContractAddress }) => {
  const realmContract = await getRealmContract(provider, {
    realmContractAddress,
  })

  const xpDistributedEventFilter = realmContract.filters.XpDistributed()
  const xpDistributedEvents = await realmContract.queryFilter(
    xpDistributedEventFilter
  )

  return getDistributorsFromEvents(xpDistributedEvents, xpContractAddress)
}

export const getUnclaimedXpDistributions: ReadTransactionBuilder<
  {
    realmAddress: string
    xpAddress: string
    claims: XpByMerkleRoot
  },
  UnclaimedXpData[]
> = async (provider, { realmAddress, xpAddress, claims }) => {
  const distributorAddresses = await getXPDistributorsAddresses(provider, {
    realmContractAddress: realmAddress,
    xpContractAddress: xpAddress,
  })

  const relevantDistributors = distributorAddresses.filter(
    ({ merkleRoot }) => !!claims[merkleRoot]
  )

  const unclaimedOrNull = await Promise.all(
    relevantDistributors.map<Promise<UnclaimedXpData | null>>(
      async ({ distributorContractAddress, merkleRoot }) => {
        const hasClaimed = await hasClaimedXp(provider, {
          distributorContractAddress,
          index: claims[merkleRoot].index,
        })

        return hasClaimed
          ? null
          : {
              distributorContractAddress,
              merkleRoot,
              claim: claims[merkleRoot],
            }
      }
    )
  )

  const unclaimed = unclaimedOrNull.filter<UnclaimedXpData>(
    (possibleDistributor): possibleDistributor is UnclaimedXpData =>
      !!possibleDistributor
  )

  return unclaimed
}

export const claimXp: WriteTransactionBuilder<{
  distributorContractAddress: string
  claim: XpMerkleTreeItem
}> = async (provider, account, { distributorContractAddress, claim }) => {
  const distributorContract = await getXpMerkleDistributorContract(provider, {
    distributorContractAddress,
  })

  return distributorContract.populateTransaction.claim(
    claim.index,
    account,
    claim.amount,
    claim.proof
  )
}

export const getXpContract: ReadTransactionBuilder<
  { xpContractAddress: string },
  Contract
> = async (provider: providers.Provider, { xpContractAddress }) =>
  new Contract(xpContractAddress, xpAbi, provider)

export const getXpDistributorFactoryContract: ReadTransactionBuilder<
  null,
  Contract
> = async (provider: providers.Provider) => {
  const gameContract = await getGameContract(provider, null)
  const xpDistributorFactoryAddress = await gameContract.xpDistributorFactory()

  return new Contract(
    xpDistributorFactoryAddress,
    xpMerkleDistributorFactoryAbi,
    provider
  )
}

export const getXpDetails: ReadTransactionBuilder<
  { xpContractAddress: string },
  { name: string; symbol: string }
> = async (provider, { xpContractAddress }) => {
  const xpContract = await getXpContract(provider, { xpContractAddress })

  const name = await xpContract.name()
  const symbol = await xpContract.symbol()

  return {
    name,
    symbol,
  }
}

export const getXpAllocatable: ReadTransactionBuilder<
  { xpContractAddress: string },
  bigint
> = async (provider, { xpContractAddress }) => {
  const xpDistributorFactoryContract = await getXpDistributorFactoryContract(
    provider,
    null
  )
  const xpAllocatable = await xpDistributorFactoryContract.xpAllocatable(
    xpContractAddress
  )

  return BigInt(xpAllocatable)
}