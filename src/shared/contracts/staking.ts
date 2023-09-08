import { Contract, providers } from "ethers"
import { getAllowance, setAllowance } from "./erc20"
import { nodeAbi } from "./abi"

export type StakingData = { regionContractAddress: string; amount: bigint }

export function getNodeContract(
  provider: providers.Provider,
  nodeContractAddress: string
): Contract {
  return new Contract(nodeContractAddress, nodeAbi, provider)
}

export async function stake(
  provider: providers.Provider,
  account: string,
  { regionContractAddress, amount }: StakingData
) {
  const regionTokenContract = getNodeContract(provider, regionContractAddress)

  const allowanceValue = await getAllowance(provider, CONTRACT_Taho, {
    account,
    contractAddress: regionContractAddress,
  })

  if (allowanceValue < amount) {
    await setAllowance(provider, CONTRACT_Taho, { account, amount }) // this is a transaction
  }

  return regionTokenContract.populateTransaction.stake(amount)
}

export async function unstake(
  provider: providers.Provider,
  account: string,
  { regionContractAddress, amount }: StakingData
) {
  const regionTokenContract = getNodeContract(provider, regionContractAddress)
  const veTokenAddress = (await regionTokenContract.veTaho()) as string

  const allowanceValue = await getAllowance(provider, veTokenAddress, {
    account,
    contractAddress: regionContractAddress,
  })

  if (allowanceValue < amount) {
    await setAllowance(provider, veTokenAddress, { account, amount }) // this is a transaction
  }

  return regionTokenContract.populateTransaction.unstake(amount)
}
