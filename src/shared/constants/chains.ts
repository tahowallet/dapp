/* eslint-disable no-console */
import { ethers } from "ethers"

export const getArbitrumRpcUrl = () => {
  if (process.env.USE_LOCALHOST_FORK === "true") {
    console.log(
      "%c🐶 Using localhost fork as Arbitrum provider",
      "background: #b57017; color: #fff; font-weight: 900;"
    )
    return process.env.LOCALHOST_RPC_URL
  }

  if (process.env.USE_TENDERLY_FORK === "true") {
    console.log(
      "%c🦴 Using Tenderly fork as Arbitrum provider",
      "background: #071111; color: #fff; font-weight: 900;"
    )
    return process.env.TENDERLY_RPC_URL
  }

  if (process.env.USE_ARBITRUM_SEPOLIA === "true") {
    return process.env.ARBITRUM_RPC_URL
  }

  throw Error("Invalid RPC URL configuration, check env variables")
}

export const ARBITRUM_SEPOLIA = {
  id: "0x66eee",
  token: "ETH",
  label: "Arbitrum Sepolia",
  rpcUrl: getArbitrumRpcUrl(),
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
  ? parseInt(process.env.CONTRACT_DEPLOYMENT_BLOCK_NUMBER, 10)
  : undefined
