import {
  ReadTransactionBuilder,
  RealmAddressesData,
  RealmContractData,
} from "shared/types"
import { Contract } from "ethers"
import { normalizeAddress } from "shared/utils"
import { realmAbi } from "./abi"
import { getTahoDeployerContract } from "./game"
import { getXpDetails } from "./xp"

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
      // TODO: The URL will be related with the XpDistributed event.
      // The function should be updated when the contracts are ready.
      const merkleDataUrl: string = await realmContract.questlineUrl()
      const xpTokenContractAddress: string = normalizeAddress(
        await realmContract.xp()
      )
      const xpTokenDetails = await getXpDetails(provider, {
        xpContractAddress: xpTokenContractAddress,
      })

      return {
        id,
        data: {
          ...data,
          name,
          xpToken: {
            ...xpTokenDetails,
            contractAddress: xpTokenContractAddress,
          },
          merkleDataUrl,
          // Population and xpAllocatable are fetched after all Realm data is initialized.
          // Contract addresses are saved in the state to ensure that
          // calculating population based on the Events is not blocking
          // displaying Island UI
          population: 0,
          xpAllocatable: 0n,
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
