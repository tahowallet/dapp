import { ethers } from "ethers"
import { ETHEREUM } from "shared/constants"
import { Transaction } from "shared/types"

class TransactionService {
  arbitrumProvider: ethers.providers.Provider | null = null

  ethereumProvider: ethers.providers.Provider | null = null

  isReady = false

  transactions: { [hash: string]: Transaction } = {}

  constructor() {
    this.ethereumProvider = new ethers.providers.JsonRpcProvider(
      ETHEREUM.rpcUrl
    )
  }

  async setArbitrumProvider(providerOrNull: ethers.providers.Provider | null) {
    this.arbitrumProvider = providerOrNull
    this.isReady = !!providerOrNull
  }
}

export default new TransactionService()
