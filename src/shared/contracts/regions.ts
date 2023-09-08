import { RegionContractData } from "shared/types/map"
import { providers } from "ethers"
import { getTahoDeployerContract } from "./game"

// eslint-disable-next-line import/prefer-default-export
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
