import { providers, Contract } from "ethers"
import { ReadTransactionBuilder } from "shared/types"
import { gameAbi, tahoDeployerAbi } from "./abi"

// eslint-disable-next-line import/prefer-default-export
export const getTahoDeployerContract: ReadTransactionBuilder<
  null,
  Contract
> = async (provider: providers.Provider) =>
  new Contract(CONTRACT_TahoDeployer, tahoDeployerAbi, provider)

export const getGameContract: ReadTransactionBuilder<null, Contract> = async (
  provider: providers.Provider
) => {
  const tahoDeployerContract = await getTahoDeployerContract(provider, null)
  const gameAddress = await tahoDeployerContract.GAME()
  return new Contract(gameAddress, gameAbi, provider)
}
