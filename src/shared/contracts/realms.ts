import { RealmContractDataWithId, ReadTransactionBuilder } from "shared/types"
import { Contract } from "ethers"
import { getTahoDeployerContract } from "./game"
import { nodeAbi } from "./abi"

export const getRealmContract: ReadTransactionBuilder<
  { realmContractAddress: string },
  Contract
> = async (provider, { realmContractAddress }) =>
  new Contract(realmContractAddress, nodeAbi, provider)

export const getRealmTokenAddresses: ReadTransactionBuilder<
  { realms: RealmContractDataWithId[] },
  { id: string; address: string; veTokenAddress: string }[]
> = async (provider, { realms }) => {
  const tahoDeployerContract = await getTahoDeployerContract(provider, null)

  const realmAddresses = await Promise.all(
    realms.map(async ({ id, data }) => {
      const realmAddress = await tahoDeployerContract[data.name]()
      const veTokenAddress = await tahoDeployerContract[`${data.name}_VETAHO`]()

      return { id, address: realmAddress, veTokenAddress }
    })
  )

  return realmAddresses
}
