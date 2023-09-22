import { RegionContractDataWithId, ReadTransactionBuilder } from "shared/types"
import { Contract } from "ethers"
import { getTahoDeployerContract } from "./game"
import { nodeAbi } from "./abi"

export const getRegionContract: ReadTransactionBuilder<
  { realmContractAddress: string },
  Contract
> = async (provider, { realmContractAddress }) =>
  new Contract(realmContractAddress, nodeAbi, provider)

export const getRegionVeTokenAddress: ReadTransactionBuilder<
  { realmContractAddress: string },
  string
> = async (provider, { realmContractAddress }) => {
  const realmTokenContract = await getRegionContract(provider, {
    realmContractAddress,
  })
  return realmTokenContract.veTaho()
}

export const getRegionTokenAddresses: ReadTransactionBuilder<
  { realms: RegionContractDataWithId[] },
  { id: string; address: string }[]
> = async (provider, { realms }) => {
  const tahoDeployerContract = await getTahoDeployerContract(provider, null)

  const realmAddresses = await Promise.all(
    realms.map(async ({ id, data }) => {
      const realmAddress = await tahoDeployerContract[data.name]()
      return { id, address: realmAddress }
    })
  )

  return realmAddresses
}
