import { Ethereum } from "@thirdweb-dev/wallets/dist/declarations/src/evm/connectors/injected/types"
import { WalletOptions } from "@thirdweb-dev/wallets"
import TahoWallet from "./wallet"

export default function tahoWallet() {
  return {
    id: TahoWallet.id,
    meta: TahoWallet.meta,

    create(options: WalletOptions) {
      return new TahoWallet(options)
    },

    isInstalled() {
      if (typeof window !== "undefined" && "ethereum" in window) {
        if (window.ethereum?.providers) {
          return window.ethereum.providers.find(
            (ethereum: Ethereum) => !!ethereum?.isTally
          )
        }

        return window.ethereum?.isTally
      }

      return false
    },
  }
}
