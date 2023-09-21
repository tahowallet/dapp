import { Contract } from "ethers"
import { ReadTransactionBuilder, WriteTransactionBuilder } from "shared/types"
import { erc20Abi } from "./abi"

export const getTokenContract: ReadTransactionBuilder<
  { tokenAddress: string },
  Contract
> = async (provider, { tokenAddress }) =>
  new Contract(tokenAddress, erc20Abi, provider)

export const getBalance: ReadTransactionBuilder<
  { tokenAddress: string; account: string },
  bigint
> = async (provider, { tokenAddress, account }) => {
  const token = await getTokenContract(provider, { tokenAddress })

  return BigInt((await token.balanceOf(account)).toString())
}

export const getSymbol: ReadTransactionBuilder<
  { tokenAddress: string },
  string
> = async (provider, { tokenAddress }) => {
  const token = await getTokenContract(provider, { tokenAddress })

  return token.symbol()
}

export const getAllowance: ReadTransactionBuilder<
  { tokenAddress: string; account: string; contractAddress: string },
  bigint
> = async (provider, { tokenAddress, account, contractAddress }) => {
  const token = await getTokenContract(provider, { tokenAddress })

  return BigInt((await token.allowance(account, contractAddress)).toString())
}

export const setAllowance: WriteTransactionBuilder<{
  tokenAddress: string
  account: string
  amount: bigint
}> = async (provider, account, { tokenAddress, amount }) => {
  const token = await getTokenContract(provider, { tokenAddress })

  return token.populateTransaction.approve(account, amount)
}

export const getTotalSupply: ReadTransactionBuilder<
  { tokenAddress: string },
  bigint
> = async (provider, { tokenAddress }) => {
  const token = await getTokenContract(provider, { tokenAddress })

  return BigInt((await token.totalSupply()).toString())
}
