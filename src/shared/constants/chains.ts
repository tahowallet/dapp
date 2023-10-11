// TODO: decide what rpc providers we want to use and if/how we want to handle being rate limited
import { ethers } from "ethers"

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

export const ETH_ADDRESS = ethers.constants.AddressZero
export const TAHO_ADDRESS = CONTRACT_Taho

export const TAHO_SYMBOL = "TAHO"
export const ETH_SYMBOL = "ETH"

export const BALANCE_UPDATE_INTERVAL = 30 * 1000

export const CONTRACT_DEPLOYMENT_BLOCK_NUMBER = process.env
  .CONTRACT_DEPLOYMENT_BLOCK_NUMBER
  ? +process.env.CONTRACT_DEPLOYMENT_BLOCK_NUMBER
  : undefined
