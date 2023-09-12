import { Contract, PopulatedTransaction, providers } from "ethers"
import { erc20Abi } from "./abi"

export function getTokenContract(
  provider: providers.Provider,
  tokenAddress: string
): Contract {
  return new Contract(tokenAddress, erc20Abi, provider)
}

/*
 * Get an account's balance from an ERC20-compliant contract.
 */
export async function getBalance(
  provider: providers.Provider,
  tokenAddress: string,
  account: string
): Promise<bigint> {
  const token = getTokenContract(provider, tokenAddress)

  return BigInt((await token.balanceOf(account)).toString())
}

export async function getAllowance(
  provider: providers.Provider,
  tokenAddress: string,
  { account, contractAddress }: { account: string; contractAddress: string }
): Promise<bigint> {
  const token = getTokenContract(provider, tokenAddress)

  return BigInt((await token.allowance(account, contractAddress)).toString())
}

export async function setAllowance(
  provider: providers.Provider,
  tokenAddress: string,
  { account, amount }: { account: string; amount: bigint }
): Promise<PopulatedTransaction> {
  const token = getTokenContract(provider, tokenAddress)

  return token.populateTransaction.approve(account, amount)
}

export async function totalSupply(
  provider: providers.Provider,
  tokenAddress: string
): Promise<bigint> {
  const token = getTokenContract(provider, tokenAddress)

  return BigInt((await token.totalSupply()).toString())
}
