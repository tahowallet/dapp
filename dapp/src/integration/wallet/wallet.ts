import {
  AbstractClientWallet,
  Connector,
  WagmiAdapter,
  WalletOptions,
  createAsyncLocalStorage,
} from "@thirdweb-dev/wallets"
import TahoConnector from "./connector"
import { TAHO_NAME, TAHO_ID, TAHO_META } from "./consts"

export default class TahoWallet extends AbstractClientWallet {
  connector?: Connector

  tahoConnector?: TahoConnector

  isInjected: boolean

  static id: string = TAHO_ID

  static override meta = TAHO_META

  // eslint-disable-next-line class-methods-use-this
  public get walletName() {
    return TAHO_NAME
  }

  constructor(options: WalletOptions) {
    super(TahoWallet.id, {
      ...options,
      walletStorage: createAsyncLocalStorage(TAHO_ID),
      walletId: TAHO_ID,
    })

    this.isInjected = !!globalThis.window.ethereum?.isTaho ?? false
  }

  async initializeConnector() {
    const tahoConnector = new TahoConnector({
      connectorStorage: this.walletStorage,
    })

    this.tahoConnector = tahoConnector
    this.connector = new WagmiAdapter(tahoConnector)

    return this.connector
  }

  async getConnector(): Promise<Connector> {
    if (!this.connector) {
      return this.initializeConnector()
    }
    return this.connector
  }
}
