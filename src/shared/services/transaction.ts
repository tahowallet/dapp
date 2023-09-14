import { ethers } from "ethers"
import { ETHEREUM } from "shared/constants"
import {
  Transaction,
  WriteTransactionBuilder,
  ReadTransactionBuilder,
} from "shared/types"

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
      throw new Error("Arbitrum provider is not ready")
    }

    return this.arbitrumProvider.getSigner().getAddress()
  }

  async getEthBalance(account?: string): Promise<bigint> {
    if (!this.arbitrumProvider) {
      throw new Error("Arbitrum provider is not ready")
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
  ): Promise<ethers.providers.TransactionReceipt> {
    if (!this.arbitrumProvider) {
      throw new Error("Arbitrum provider is not ready")
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
      throw new Error("Transaction is not ready")
    }

    const transaction = await signer.sendTransaction({
      from: address,
      nonce,
      ...transactionRequest,
    })

    const receipt = await transaction.wait()

    return receipt
  }

  async read<T, Response>(
    transactionBuilder: ReadTransactionBuilder<T, Response>,
    data: T
  ): Promise<Response> {
    if (!this.arbitrumProvider) {
      throw new Error("Arbitrum provider is not ready")
    }

    return transactionBuilder(this.arbitrumProvider, data)
  }
}

export default new TransactionService()
