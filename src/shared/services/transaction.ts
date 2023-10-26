import Emittery from "emittery"
import { ethers } from "ethers"
import { ETHEREUM } from "shared/constants"
import {
  WriteTransactionBuilder,
  ReadTransactionBuilder,
  TransactionProgressStatus,
} from "shared/types"
import { normalizeAddress } from "shared/utils"

const ERROR_MESSAGE = {
  NO_ARBITRUM_PROVIDER: "Arbitrum provider is not ready, check RPC URL setup",
  NO_ARBITRUM_SIGNER: "Arbitrum signer is not ready, check wallet connection",
  TRANSACTION_BUILDER_FAILED: "Transaction is not ready",
}

type Events = {
  updateTransactionStatus: {
    id: string
    status: TransactionProgressStatus
  }
}

class TransactionService {
  arbitrumProvider: ethers.providers.Provider | null = null

  arbitrumProviderFallback: ethers.providers.Provider | null = null

  arbitrumSigner: ethers.providers.JsonRpcSigner | null = null

  ethereumProvider: ethers.providers.Provider | null = null

  emitter = new Emittery<Events>()

  constructor() {
    this.ethereumProvider = new ethers.providers.JsonRpcProvider(
      ETHEREUM.rpcUrl
    )
  }

  async getSignerAddress(): Promise<string> {
    if (!this.arbitrumSigner) {
      throw new Error(ERROR_MESSAGE.NO_ARBITRUM_SIGNER)
    }

    return normalizeAddress(await this.arbitrumSigner.getAddress())
  }

  async getEthBalance(account?: string): Promise<bigint> {
    if (!this.arbitrumProvider) {
      throw new Error(ERROR_MESSAGE.NO_ARBITRUM_PROVIDER)
    }

    const address = account ?? (await this.getSignerAddress())
    const ethBalance = await this.arbitrumProvider.getBalance(address)

    return ethBalance.toBigInt()
  }

  async setArbitrumProvider(providerOrNull: ethers.providers.Provider | null) {
    this.arbitrumProvider = providerOrNull
  }

  async setArbitrumProviderFallback(
    providerOrNull: ethers.providers.Provider | null
  ) {
    this.arbitrumProviderFallback = providerOrNull
  }

  async setArbitrumSigner(signerOrNull: ethers.providers.JsonRpcSigner | null) {
    this.arbitrumSigner = signerOrNull
  }

  async emitTransactionStatus(
    id: string | null,
    status: TransactionProgressStatus
  ) {
    if (id) {
      await this.emitter.emit("updateTransactionStatus", { id, status })
    }
  }

  async send<T>(
    id: string | null,
    transactionBuilder: WriteTransactionBuilder<T>,
    data: T
  ): Promise<ethers.providers.TransactionReceipt | null> {
    try {
      if (!this.arbitrumProvider || !this.arbitrumSigner) {
        throw new Error(ERROR_MESSAGE.NO_ARBITRUM_PROVIDER)
      }

      const signer = this.arbitrumSigner
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

      this.emitTransactionStatus(id, TransactionProgressStatus.Signing)

      const transaction = await signer.sendTransaction({
        from: address,
        nonce,
        ...transactionRequest,
      })

      this.emitTransactionStatus(id, TransactionProgressStatus.Sending)

      const receipt = await transaction.wait()

      this.emitTransactionStatus(id, TransactionProgressStatus.Done)

      return receipt
    } catch (error) {
      this.emitTransactionStatus(id, TransactionProgressStatus.Failed)

      // eslint-disable-next-line no-console
      console.error("Failed to send transaction", error)
      return null
    }
  }

  async read<T, Response>(
    transactionBuilder: ReadTransactionBuilder<T, Response>,
    data: T,
    providerFallback?: ethers.providers.Provider
  ): Promise<Response | null> {
    try {
      const provider = providerFallback ?? this.arbitrumProvider

      if (!provider) {
        throw new Error(ERROR_MESSAGE.NO_ARBITRUM_PROVIDER)
      }

      const response = await transactionBuilder(provider, data)

      return response
    } catch (error) {
      // Use providerFallback only once.
      // The next attempt should return null.
      if (this.arbitrumProviderFallback && !providerFallback) {
        const response = await this.read(
          transactionBuilder,
          data,
          this.arbitrumProviderFallback
        )
        return response
      }
      // eslint-disable-next-line no-console
      console.error("Failed to read data from the blockchain", error)
      return null
    }
  }
}

export default new TransactionService()
