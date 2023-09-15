import { ethers } from "ethers"
import { ETHEREUM } from "shared/constants"

// TODO: remove when replaced by service
// eslint-disable-next-line import/prefer-default-export
export const ethereumProvider = new ethers.providers.JsonRpcProvider(
  ETHEREUM.rpcUrl
)
