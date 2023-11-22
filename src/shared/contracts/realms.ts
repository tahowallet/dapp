import { ReadTransactionBuilder, RealmAddressesData } from "shared/types"
import { Contract } from "ethers"
import { normalizeAddress } from "shared/utils"
import { realmAbi } from "./abi"

export const getRealmContract: ReadTransactionBuilder<
  { realmContractAddress: string },
  Contract
> = async (provider, { realmContractAddress }) =>
  new Contract(realmContractAddress, realmAbi, provider)

export const getRealmTokenAddresses: ReadTransactionBuilder<
  { realms: { [id: string]: { address: string } } },
  {
    id: string
    data: RealmAddressesData
  }[]
> = async (provider, { realms }) => {
  const realmAddresses = await Promise.all(
    Object.entries(realms).map(async ([id, { address }]) => {
      const realmContract = await getRealmContract(provider, {
        realmContractAddress: address,
      })
      const veTokenContractAddress: string = await realmContract.veTaho()

      return {
        id,
        data: {
          realmContractAddress: normalizeAddress(address),
          veTokenContractAddress: normalizeAddress(veTokenContractAddress),
        },
      }
    })
  )

  return realmAddresses
}
