import {
  AsyncStorage,
  Chain,
  ProviderRpcError,
  UserRejectedRequestError,
  WagmiConnector,
  normalizeChainId,
} from "@thirdweb-dev/wallets"
import { Ethereum } from "@thirdweb-dev/wallets/dist/declarations/src/evm/connectors/injected/types"
import { providers, utils } from "ethers"

type TahoConnectorConstructorArg = {
  chains?: Chain[]
  options?: TahoConnectorOptions
  connectorStorage: AsyncStorage
}

export type TahoConnectorOptions = {
  name?: string
  shimDisconnect?: boolean
  getProvider: () => Ethereum | undefined
}

export default class TahoConnector extends WagmiConnector<
  Ethereum,
  TahoConnectorOptions,
  providers.JsonRpcSigner
> {
  readonly id: string

  readonly name: string

  readonly ready: boolean

  #provider?: Ethereum

  connectorStorage: AsyncStorage

  protected shimDisconnectKey = "taho.shimDisconnect" // TODO: not sure about the whole shimDisconnect thing

  constructor(arg: TahoConnectorConstructorArg) {
    const defaultOptions = {
      name: "Taho",
      shimDisconnect: true,
      getProvider() {
        function getReady(ethereum?: Ethereum): Ethereum | undefined {
          const isTaho = !!ethereum?.isTally
          if (!isTaho) {
            return undefined
          }
          return ethereum
        }

        if (typeof window !== "undefined" && "ethereum" in window) {
          if (window.ethereum?.providers) {
            return window.ethereum.providers.find(getReady)
          }

          return getReady(window.ethereum)
        }

        return undefined
      },
    }

    const options = {
      ...defaultOptions,
      ...arg.options,
    }

    super({ chains: arg.chains, options })

    const provider = options.getProvider()
    this.name = options.name
    this.id = "taho"
    this.ready = !!provider
    this.connectorStorage = arg.connectorStorage
  }

  async connect(options?: { chainId?: number }) {
    try {
      const provider = await this.getProvider()

      this.setupListeners()
      this.emit("message", { type: "connecting" })

      const accountAddresses = await provider.request({
        method: "eth_requestAccounts",
      })

      const firstAccountAddress = utils.getAddress(
        accountAddresses[0] as string
      )

      let connectedChainId = await this.getChainId()
      let isUnsupported = this.isChainUnsupported(connectedChainId)

      // if chainId is specified and it is not the same as the currently connected chain
      if (options?.chainId && connectedChainId !== options?.chainId) {
        // switch to the given chain
        try {
          await this.switchChain(options.chainId)
          // recalculate connectedChainId and isUnsupported
          connectedChainId = options.chainId
          isUnsupported = this.isChainUnsupported(options.chainId)
        } catch (e) {
          throw Error(`Could not switch to chain id: ${options.chainId}, ${e}`)
        }
      }

      // if shimDisconnect is enabled
      if (this.options.shimDisconnect) {
        // add the shim shimDisconnectKey => it signals that wallet is connected
        await this.connectorStorage.setItem(this.shimDisconnectKey, "true")
      }

      const connectionInfo = {
        account: firstAccountAddress,
        chain: { id: connectedChainId, unsupported: isUnsupported },
        provider,
      }

      this.emit("connect", connectionInfo)
      return connectionInfo
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) {
        throw new UserRejectedRequestError(error)
      }

      throw error
    }
  }

  async disconnect(): Promise<void> {
    const provider = await this.getProvider()

    if (!provider?.removeListener) {
      return
    }

    provider.removeListener("accountsChanged", this.onAccountsChanged)
    provider.removeListener("chainChanged", this.onChainChanged)
    provider.removeListener("disconnect", this.onDisconnect)

    // if shimDisconnect is enabled
    if (this.options.shimDisconnect) {
      // Remove the shimDisconnectKey => it signals that wallet is disconnected
      await this.connectorStorage.removeItem(this.shimDisconnectKey)
    }
  }

  async getAccount(): Promise<string> {
    const provider = await this.getProvider()
    const accounts = await provider.request({
      method: "eth_accounts",
    })
    return utils.getAddress(accounts[0] as string)
  }

  async getChainId(): Promise<number> {
    const provider = await this.getProvider()
    return provider.request({ method: "eth_chainId" }).then(normalizeChainId)
  }

  async getProvider(): Promise<Ethereum> {
    const provider = this.options.getProvider()
    if (provider) {
      this.#provider = provider
    } else {
      throw new Error("No provider found")
    }
    return this.#provider as Ethereum
  }

  async getSigner({
    chainId,
  }: { chainId?: number } = {}): Promise<providers.JsonRpcSigner> {
    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ])
    return new providers.Web3Provider(
      provider as providers.ExternalProvider,
      chainId
    ).getSigner(account)
  }

  async isAuthorized(): Promise<boolean> {
    try {
      if (
        this.options.shimDisconnect &&
        !(await this.connectorStorage.getItem(this.shimDisconnectKey))
      ) {
        return false
      }

      return !!(await this.getAccount())
    } catch {
      return false
    }
  }

  override async switchChain(chainId: number): Promise<Chain> {
    const provider = await this.getProvider()
    const chainIdHex = utils.hexValue(chainId)

    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    })
    const chain = this.chains.find((_chain) => _chain.chainId === chainId)
    if (chain) {
      return chain
    }

    // TODO: we can try add custom chain here with "wallet_addEthereumChain"

    throw new Error(`Unsupported chainId: ${chainId}`)
  }

  protected onAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) {
      this.emit("disconnect")
    } else {
      this.emit("change", {
        account: utils.getAddress(accounts[0] as string),
      })
    }
  }

  protected onChainChanged(chainId: number | string): void {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit("change", { chain: { id, unsupported } })
  }

  protected async onDisconnect(): Promise<void> {
    this.emit("disconnect")

    // Remove `shimDisconnect` => it signals that wallet is disconnected
    if (this.options.shimDisconnect) {
      await this.connectorStorage.removeItem(this.shimDisconnectKey)
    }
  }

  async setupListeners(): Promise<void> {
    const provider = await this.getProvider()
    if (provider.on) {
      provider.on("accountsChanged", this.onAccountsChanged)
      provider.on("chainChanged", this.onChainChanged)
      provider.on("disconnect", this.onDisconnect)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected isUserRejectedRequestError(error: unknown) {
    return (error as ProviderRpcError).code === 4001
  }
}
