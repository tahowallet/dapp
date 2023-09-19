import { providers, Contract } from "ethers"
import { ReadTransactionBuilder } from "shared/types"
import { tahoDeployerAbi } from "./abi"

// eslint-disable-next-line import/prefer-default-export
export const getTahoDeployerContract: ReadTransactionBuilder<
  null,
  Contract
> = async (provider: providers.Provider) =>
  new Contract(CONTRACT_TahoDeployer, tahoDeployerAbi, provider)
