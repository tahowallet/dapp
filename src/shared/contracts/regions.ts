import { RegionContractData } from "shared/types/map"
import { Contract, providers } from "ethers"
import { getTahoDeployerContract } from "./game"
import { nodeAbi } from "./abi"

export function getRegionContract(
  provider: providers.Provider,
  regionContractAddress: string
): Contract {
  return new Contract(regionContractAddress, nodeAbi, provider)
}

export function getRegionVeTokenAddress(
  provider: providers.Provider,
  regionContractAddress: string
): Promise<string> {
  const regionTokenContract = getRegionContract(provider, regionContractAddress)
  return regionTokenContract.veTaho()
}

export async function getRegionAddresses(
  provider: providers.Provider,
  { regions }: { regions: { id: string; data: RegionContractData }[] }
): Promise<{ id: string; address: string }[]> {
  const tahoDeployerContract = getTahoDeployerContract(provider)

  const regionAddresses = await Promise.all(
    regions.map(async ({ id, data }) => {
      const regionAddress = await tahoDeployerContract[data.name]()
      return { id, address: regionAddress }
    })
  )

  return regionAddresses
}
