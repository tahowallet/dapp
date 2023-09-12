import { Contract, PopulatedTransaction, providers } from "ethers"
import { LiquidityPoolRequest } from "../types"
import { balancerPoolAgentAbi } from "./abi"
import { getTahoDeployerContract } from "./game"

export function getBalancerPoolAddress(provider: providers.Provider): string {
  const tahoDeployer = getTahoDeployerContract(provider)

  return tahoDeployer.BALANCER_POOL()
}

export function getBalancerPoolAgentAddress(
  provider: providers.Provider
): string {
  const tahoDeployer = getTahoDeployerContract(provider)

  return tahoDeployer.BALANCER_POOL_AGENT()
}

async function getBalancerPoolAgentContract(
  provider: providers.Provider
): Promise<Contract> {
  const balancerPoolAgentAddress = await getBalancerPoolAgentAddress(provider)

  return new Contract(balancerPoolAgentAddress, balancerPoolAgentAbi, provider)
}

export async function joinPool(
  provider: providers.Provider,
  recipient: string,
  {
    joinRequest,
    overrides,
  }: { joinRequest: LiquidityPoolRequest; overrides?: { value: bigint } }
): Promise<PopulatedTransaction> {
  const balancerPoolAgent = await getBalancerPoolAgentContract(provider)

  return balancerPoolAgent.populateTransaction.joinPool(
    recipient,
    joinRequest,
    overrides
  )
}
