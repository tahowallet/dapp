import { Contract, providers } from "ethers"
import {
  ReadTransactionBuilder,
  UnclaimedXpData,
  WriteTransactionBuilder,
  XpMerkleTreeItem,
} from "shared/types"
import { normalizeAddress } from "shared/utils"
import { getXpDataForRealmId } from "shared/utils/xp"
import {
  xpMerkleDistributorAbi,
  xpAbi,
  xpMerkleDistributorFactoryAbi,
} from "./abi"
import { getGameContract } from "./game"

export const getXpMerkleDistributorContract: ReadTransactionBuilder<
  { distributorContractAddress: string },
  Contract
> = async (provider, { distributorContractAddress }) =>
  new Contract(distributorContractAddress, xpMerkleDistributorAbi, provider)

export const hasClaimedXp: ReadTransactionBuilder<
  {
    distributorContractAddress: string
    index: string
  },
  boolean
> = async (provider, { distributorContractAddress, index }) => {
  const distributorContract = await getXpMerkleDistributorContract(provider, {
    distributorContractAddress,
  })

  const hasClaimed = await distributorContract.isClaimed(index)

  return hasClaimed
}

export const getUnclaimedXpDistributions: ReadTransactionBuilder<
  {
    realmId: string
    account: string
  },
  UnclaimedXpData[]
> = async (provider, { realmId, account }) => {
  const xpData = await getXpDataForRealmId(realmId, account)

  const unclaimedOrNull = await Promise.all(
    xpData.map<Promise<UnclaimedXpData | null>>(
      async ({ merkleDistributor, merkleRoot, claims }) => {
        const claim = claims[normalizeAddress(account)]

        if (claim) {
          const hasClaimed = await hasClaimedXp(provider, {
            distributorContractAddress: merkleDistributor,
            index: claim.index,
          })

          return hasClaimed
            ? null
            : {
                distributorContractAddress: merkleDistributor,
                merkleRoot,
                claim,
              }
        }
        return null
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
