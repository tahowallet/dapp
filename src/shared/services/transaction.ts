import { ethers } from "ethers"
import { ETHEREUM } from "shared/constants"
import {
  Transaction,
  WriteTransactionBuilder,
  ReadTransactionBuilder,
} from "shared/types"

const ERROR_MESSAGE = {
  NO_ARBITRUM_PROVIDER: "Arbitrum provider is not ready",
  TRANSACTION_BUILDER_FAILED: "Transaction is not ready",
}

class TransactionService {
  arbitrumProvider: ethers.providers.Web3Provider | null = null

  ethereumProvider: ethers.providers.Provider | null = null

  transactions: { [hash: string]: Transaction } = {}

  constructor() {
    this.ethereumProvider = new ethers.providers.JsonRpcProvider(
      ETHEREUM.rpcUrl
    )
  }

  async getSignerAddress(): Promise<string> {
    if (!this.arbitrumProvider) {
      throw new Error(ERROR_MESSAGE.NO_ARBITRUM_PROVIDER)
    }

    return this.arbitrumProvider.getSigner().getAddress()
  }

  async getEthBalance(account?: string): Promise<bigint> {
    if (!this.arbitrumProvider) {
      throw new Error(ERROR_MESSAGE.NO_ARBITRUM_PROVIDER)
    }

    const address = account ?? (await this.getSignerAddress())
    const ethBalance = await this.arbitrumProvider.getBalance(address)

    return ethBalance.toBigInt()
  }

  async setArbitrumProvider(
    providerOrNull: ethers.providers.Web3Provider | null
  ) {
    this.arbitrumProvider = providerOrNull
  }

  async send<T>(
    transactionBuilder: WriteTransactionBuilder<T>,
    data: T
  ): Promise<ethers.providers.TransactionReceipt | null> {
    try {
      if (!this.arbitrumProvider) {
        throw new Error(ERROR_MESSAGE.NO_ARBITRUM_PROVIDER)
      }

      const signer = this.arbitrumProvider.getSigner()
      const address = await signer.getAddress()
      const nonce = await this.arbitrumProvider.getTransactionCount(
        address,
        "latest"
      )

      const transactionRequest = await transactionBuilder(
        this.arbitrumProvider,
        address,
        data
      )

      if (!transactionRequest) {
        throw new Error(ERROR_MESSAGE.TRANSACTION_BUILDER_FAILED)
      }

      const transaction = await signer.sendTransaction({
        from: address,
        nonce,
        ...transactionRequest,
      })

      const receipt = await transaction.wait()

      return receipt
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to send transaction", error)
      return null
    }
  }

  async read<T, Response>(
    transactionBuilder: ReadTransactionBuilder<T, Response>,
    data: T
  ): Promise<Response | null> {
    try {
      if (!this.arbitrumProvider) {
        throw new Error(ERROR_MESSAGE.NO_ARBITRUM_PROVIDER)
      }

      const response = await transactionBuilder(this.arbitrumProvider, data)

      return response
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to read data from the blockchain", error)
      return null
    }
  }
}

export default new TransactionService()
