import { ReadTransactionBuilder, RealmContractDataWithId } from "shared/types"
import { Contract } from "ethers"
import { getTahoDeployerContract } from "./tahoDeployer"
import { realmAbi } from "./abi"

export const getRealmContract: ReadTransactionBuilder<
  { realmContractAddress: string },
  Contract
> = async (provider, { realmContractAddress }) =>
  new Contract(realmContractAddress, realmAbi, provider)

export const getRealmTokenAddresses: ReadTransactionBuilder<
  { realms: { [id: string]: { name: string } } },
  {
    id: string
    data: {
      name: string
      realmContractAddress: string
      veTokenContractAddress: string
    }
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
          name,
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
    realmAddresses: {
      id: string
      data: {
        name: string
        realmContractAddress: string
        veTokenContractAddress: string
      }
    }[]
  },
  RealmContractDataWithId[]
> = async (provider, { realmAddresses }) => {
  const realmData = await Promise.all(
    realmAddresses.map(async ({ id, data }) => {
      const realmContract = await getRealmContract(provider, {
        realmContractAddress: data.realmContractAddress,
      })

      const realmName: string = await realmContract.realmName
      const xpTokenNamePrefix: string = await realmContract.xpTokenNamePrefix()
      const xpTokenSymbolPrefix: string =
        await realmContract.xpTokenSymbolPrefix()

      return {
        id,
        data: { ...data, realmName, xpTokenNamePrefix, xpTokenSymbolPrefix },
      }
    })
  )
  return realmData
}

export const getAllRealmsData: ReadTransactionBuilder<
  { realms: { [id: string]: { name: string } } },
  RealmContractDataWithId[]
> = async (provider, { realms }) => {
  const realmAddresses = await getRealmTokenAddresses(provider, {
    realms,
  })

  const realmData = await getRealmData(provider, { realmAddresses })

  return realmData
}
