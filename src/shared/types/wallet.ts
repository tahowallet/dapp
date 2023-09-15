export type TokenBalances = {
  [address: string]: {
    symbol: string
    balance: bigint
  }
}
