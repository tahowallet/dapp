import { Contract, providers } from "ethers"
import { ReadTransactionBuilder } from "shared/types"
import xpAbi from "./abi/xpAbi"
import { xpMerkleDistributorFactoryAbi } from "./abi"
import { getGameContract } from "./game"

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
