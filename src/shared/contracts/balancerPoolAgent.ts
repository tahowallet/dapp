import { Contract } from "ethers"
import { ReadTransactionBuilder, WriteTransactionBuilder } from "shared/types"
import { LiquidityPoolRequest } from "../types"
import { balancerPoolAgentAbi } from "./abi"
import { getTahoDeployerContract } from "./game"

export const getBalancerPoolAddress: ReadTransactionBuilder<
  null,
  string
> = async (provider) => {
  const tahoDeployer = await getTahoDeployerContract(provider, null)

  return tahoDeployer.BALANCER_POOL()
}

export const getBalancerPoolAgentAddress: ReadTransactionBuilder<
  null,
  string
> = async (provider) => {
  const tahoDeployer = await getTahoDeployerContract(provider, null)

  return tahoDeployer.BALANCER_POOL_AGENT()
}

export const getBalancerPoolAgentContract: ReadTransactionBuilder<
  null,
  Contract
> = async (provider) => {
  const balancerPoolAgentAddress = await getBalancerPoolAddress(provider, null)

  return new Contract(balancerPoolAgentAddress, balancerPoolAgentAbi, provider)
}

export const joinPool: WriteTransactionBuilder<{
  joinRequest: LiquidityPoolRequest
  overrides: { value: bigint }
}> = async (provider, account, { joinRequest, overrides }) => {
  const balancerPoolAgent = await getBalancerPoolAgentContract(provider, null)

  return balancerPoolAgent.populateTransaction.joinPool(
    account,
    joinRequest,
    overrides
  )
}
