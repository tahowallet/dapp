import { RegionContractDataWithId, ReadTransactionBuilder } from "shared/types"
import { Contract } from "ethers"
import { getTahoDeployerContract } from "./game"
import { nodeAbi } from "./abi"

export const getRegionContract: ReadTransactionBuilder<
  { regionContractAddress: string },
  Contract
> = async (provider, { regionContractAddress }) =>
  new Contract(regionContractAddress, nodeAbi, provider)

export const getRegionTokenAddresses: ReadTransactionBuilder<
  { regions: RegionContractDataWithId[] },
  { id: string; address: string; veTokenAddress: string }[]
> = async (provider, { regions }) => {
  const tahoDeployerContract = await getTahoDeployerContract(provider, null)

  const regionAddresses = await Promise.all(
    regions.map(async ({ id, data }) => {
      const regionAddress = await tahoDeployerContract[data.name]()
      const veTokenAddress = await tahoDeployerContract[`${data.name}_VETAHO`]()

      return { id, address: regionAddress, veTokenAddress }
    })
  )

  return regionAddresses
}
