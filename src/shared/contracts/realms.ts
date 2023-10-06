import {
  ReadTransactionBuilder,
  RealmAddressesData,
  RealmContractData,
} from "shared/types"
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
          realmContractAddress,
          veTokenContractAddress,
        },
      }
    })
  )

  return realmAddresses
}

export const getRealmData: ReadTransactionBuilder<
  {
    realmsWithContractData: {
      id: string
      data: RealmAddressesData
    }[]
  },
  { id: string; data: RealmAddressesData & RealmContractData }[]
> = async (provider, { realmsWithContractData }) => {
  const realmData = await Promise.all(
    realmsWithContractData.map(async ({ id, data }) => {
      const realmContract = await getRealmContract(provider, {
        realmContractAddress: data.realmContractAddress,
      })

      const name: string = await realmContract.realmName
      const xpTokenNamePrefix: string = await realmContract.xpTokenNamePrefix()
      const xpTokenSymbolPrefix: string =
        await realmContract.xpTokenSymbolPrefix()
      const questlineUrl: string = await realmContract.questlineUrl()
      const xpTokenContractAddress: string = normalizeAddress(
        await realmContract.xp()
      )

      return {
        id,
        data: {
          ...data,
          name,
          xpTokenContractAddress,
          xpTokenNamePrefix,
          xpTokenSymbolPrefix,
          questlineUrl,
        },
      }
    })
  )
  return realmData
}

export const getAllRealmsData: ReadTransactionBuilder<
  { realms: { [id: string]: { name: string } } },
  { id: string; data: RealmAddressesData & RealmContractData }[]
> = async (provider, { realms }) => {
  const realmsWithContractData = await getRealmTokenAddresses(provider, {
    realms,
  })

  const realmData = await getRealmData(provider, { realmsWithContractData })

  return realmData
}
