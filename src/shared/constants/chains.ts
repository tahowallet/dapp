// TODO: decide what rpc providers we want to use and if/how we want to handle being rate limited
export const ARBITRUM = {
  id: "0xa4b1",
  token: "ETH",
  label: "Arbitrum One",
  rpcUrl:
    process.env.USE_ARBITRUM_FORK === "true"
      ? process.env.LOCALHOST_RPC_URL
      : process.env.ARBITRUM_RPC_URL,
}

export const ETHEREUM = {
  id: "0x1",
  token: "ETH",
  label: "Ethereum",
  rpcUrl: process.env.ETHEREUM_RPC_URL,
}
