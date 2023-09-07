import { Contract, PopulatedTransaction, providers } from "ethers"
import { erc20Abi } from "./abi"

function getTokenContract(
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
  { account, address }: { account: string; address: string }
): Promise<bigint> {
  const token = getTokenContract(provider, tokenAddress)

  return BigInt((await token.allowance(account, address)).toString())
}

export async function setAllowance(
  provider: providers.Provider,
  tokenAddress: string,
  { address, amount }: { address: string; amount: bigint }
): Promise<PopulatedTransaction> {
  const token = getTokenContract(provider, tokenAddress)

  return token.populateTransaction.approve(address, amount)
}

export async function totalSupply(
  provider: providers.Provider,
  tokenAddress: string
): Promise<bigint> {
  const token = getTokenContract(provider, tokenAddress)

  return BigInt((await token.totalSupply()).toString())
}
