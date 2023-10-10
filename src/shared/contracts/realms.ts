import { ReadTransactionBuilder, RealmAddressesData } from "shared/types"
import { Contract } from "ethers"
import { normalizeAddress } from "shared/utils"
import { realmAbi } from "./abi"
import { getTahoDeployerContract } from "./game"

export const getRealmContract: ReadTransactionBuilder<
  { realmContractAddress: string },
  Contract
> = async (provider, { realmContractAddress }) =>
  new Contract(realmContractAddress, realmAbi, provider)

export const getRealmTokenAddresses: ReadTransactionBuilder<
  { realms: { [id: string]: { name: string } } },
  {
    id: string
    data: RealmAddressesData
  }[]
> = async (provider, { realms }) => {
  const tahoDeployerContract = await getTahoDeployerContract(provider, null)

  const realmAddresses = await Promise.all(
    Object.entries(realms).map(async ([id, { name }]) => {
      const realmContractAddress: string = await tahoDeployerContract[name]()
      const veTokenContractAddress: string = await tahoDeployerContract[
        `${name}_VETAHO`
      ]()

      return {
        id,
        data: {
          realmContractAddress: normalizeAddress(realmContractAddress),
          veTokenContractAddress: normalizeAddress(veTokenContractAddress),
        },
      }
    })
  )

  return realmAddresses
}
