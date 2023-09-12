import { ethers } from "ethers"
import { ETHEREUM } from "shared/constants"

// eslint-disable-next-line import/prefer-default-export
export const ethereumProvider = new ethers.providers.JsonRpcProvider(
  ETHEREUM.rpcUrl
)
