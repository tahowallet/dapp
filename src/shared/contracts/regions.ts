import { RegionContractDataWithId, ReadTransactionBuilder } from "shared/types"
import { Contract } from "ethers"
import { getTahoDeployerContract } from "./game"
import { nodeAbi } from "./abi"

export const getRegionContract: ReadTransactionBuilder<
  { regionContractAddress: string },
  Contract
> = async (provider, { regionContractAddress }) =>
  new Contract(regionContractAddress, nodeAbi, provider)

export const getRegionVeTokenAddress: ReadTransactionBuilder<
  { regionContractAddress: string },
  string
> = async (provider, { regionContractAddress }) => {
  const regionTokenContract = await getRegionContract(provider, {
    regionContractAddress,
  })
  return regionTokenContract.veTaho()
}

export const getRegionTokenAddresses: ReadTransactionBuilder<
  { regions: RegionContractDataWithId[] },
  { id: string; address: string }[]
> = async (provider, { regions }) => {
  const tahoDeployerContract = await getTahoDeployerContract(provider, null)

  const regionAddresses = await Promise.all(
    regions.map(async ({ id, data }) => {
      const regionAddress = await tahoDeployerContract[data.name]()
      return { id, address: regionAddress }
    })
  )

  return regionAddresses
}
