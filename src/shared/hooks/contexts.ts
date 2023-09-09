import { ethers } from "ethers"
import { createContext } from "react"
import { ETHEREUM } from "shared/constants"

export const ethereumProvider = new ethers.providers.JsonRpcProvider(
  ETHEREUM.rpcUrl
)

export const EthereumProviderContext =
  createContext<typeof ethereumProvider>(ethereumProvider)
