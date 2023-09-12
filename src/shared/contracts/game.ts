import { providers, Contract } from "ethers"
import { tahoDeployerAbi } from "./abi"

// eslint-disable-next-line import/prefer-default-export
export function getTahoDeployerContract(provider: providers.Provider) {
  return new Contract(CONTRACT_TahoDeployer, tahoDeployerAbi, provider)
}
