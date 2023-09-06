import { Contract, PopulatedTransaction, providers } from "ethers"
import { EventFragment, Fragment, FunctionFragment } from "ethers/lib/utils"

// TODO: Would be nice to improve this with typechain data from contracts
export const ERC20_FUNCTIONS = {
  allowance: FunctionFragment.from(
    "allowance(address owner, address spender) view returns (uint256)"
  ),
  approve: FunctionFragment.from(
    "approve(address spender, uint256 value) returns (bool)"
  ),
  balanceOf: FunctionFragment.from(
    "balanceOf(address owner) view returns (uint256)"
  ),
  decimals: FunctionFragment.from("decimals() view returns (uint8)"),
  name: FunctionFragment.from("name() view returns (string)"),
  symbol: FunctionFragment.from("symbol() view returns (string)"),
  totalSupply: FunctionFragment.from("totalSupply() view returns (uint256)"),
  transfer: FunctionFragment.from(
    "transfer(address to, uint amount) returns (bool)"
  ),
  transferFrom: FunctionFragment.from(
    "transferFrom(address from, address to, uint amount) returns (bool)"
  ),
}

const ERC20_EVENTS = {
  Transfer: EventFragment.from(
    "Transfer(address indexed from, address indexed to, uint amount)"
  ),
  Approval: EventFragment.from(
    "Approval(address indexed owner, address indexed spender, uint amount)"
  ),
}

export const ERC20_ABI = Object.values<Fragment>(ERC20_FUNCTIONS).concat(
  Object.values(ERC20_EVENTS)
)

function getTokenContract(
  provider: providers.Provider,
  tokenAddress: string
): Contract {
  return new Contract(tokenAddress, ERC20_ABI, provider)
}

/*
 * Get an account's balance from an ERC20-compliant contract.
 */
export async function getBalance(
  provider: providers.Provider,
  tokenAddress: string,
  account: string
): Promise<bigint> {
  const token = await getTokenContract(provider, tokenAddress)

  return BigInt((await token.balanceOf(account)).toString())
}

export async function getAllowance(
  provider: providers.Provider,
  tokenAddress: string,
  { account, address }: { account: string; address: string }
): Promise<bigint> {
  const token = await getTokenContract(provider, tokenAddress)

  return BigInt((await token.allowance(account, address)).toString())
}

export async function setAllowance(
  provider: providers.Provider,
  tokenAddress: string,
  { address, amount }: { address: string; amount: bigint }
): Promise<PopulatedTransaction> {
  const token = await getTokenContract(provider, tokenAddress)

  return token.populateTransaction.approve(address, amount)
}

export async function totalSupply(
  provider: providers.Provider,
  tokenAddress: string
): Promise<bigint> {
  const token = await getTokenContract(provider, tokenAddress)

  return BigInt((await token.totalSupply()).toString())
}
