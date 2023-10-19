import { useConnectWallet } from "@web3-onboard/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ethers, logger } from "ethers"
import {
  useDappDispatch,
  connectWalletGlobally,
  disconnectWalletGlobally,
  useDappSelector,
  selectWalletAddress,
  fetchWalletBalances,
  resetBalances,
  resetIsland,
  resetClaiming,
  connectArbitrumProvider,
  selectDisplayedRealmId,
} from "redux-state"
import {
  ARBITRUM_SEPOLIA,
  BALANCE_UPDATE_INTERVAL,
  LOCAL_STORAGE_WALLET,
} from "shared/constants"
import { Logger, defineReadOnly } from "ethers/lib/utils"
import { Network } from "@ethersproject/networks"
import { useAssistant } from "./assistant"
import { useInterval, useLocalStorageChange } from "./helpers"

class StaticJsonBatchRpcProvider extends ethers.providers.JsonRpcBatchProvider {
  override async detectNetwork(): Promise<Network> {
    let { network } = this
    if (network == null) {
      network = await super.detectNetwork()

      if (!network) {
        logger.throwError(
          "no network detected",
          Logger.errors.UNKNOWN_ERROR,
          {}
        )
      }

      // If still not set, set it
      // eslint-disable-next-line no-underscore-dangle
      if (this._network == null) {
        // A static network does not support "any"
        defineReadOnly(this, "_network", network)

        this.emit("network", network, null)
      }
    }
    return network
  }
}

// To make it possible to start fetching blockchain data before the user
// connects the wallet let's get the provider from the RPC URL
export function useArbitrumProvider(): ethers.providers.JsonRpcBatchProvider {
  const arbitrumProvider = useMemo(
    () => new StaticJsonBatchRpcProvider(ARBITRUM_SEPOLIA.rpcUrl),
    []
  )

  return arbitrumProvider
}

// Signing transaction is always done with the signer from the wallet
export function useArbitrumSigner(): ethers.providers.JsonRpcSigner | null {
  const [{ wallet }] = useConnectWallet()

  const arbitrumSigner = useMemo(() => {
    if (wallet?.provider !== undefined) {
      return new ethers.providers.Web3Provider(wallet.provider).getSigner()
    }

    return null
  }, [wallet?.provider])

  return arbitrumSigner
}

// Balance update is set to 30 seconds for now to ensure it is not too frequent
// but it can be adjusted if needed. We should be able to fetch balances when needed by
// using the `fetchWalletBalances` action. This hook is just to ensure balances are
// updated periodically.
export function useBalanceFetch() {
  const dispatch = useDappDispatch()
  const account = useDappSelector(selectWalletAddress)

  const walletBalancesCallback = useCallback(async () => {
    if (account && dispatch) {
      await dispatch(fetchWalletBalances())
    }
  }, [account, dispatch])

  useInterval(walletBalancesCallback, account ? BALANCE_UPDATE_INTERVAL : null)
}

export function useWallet() {
  const [{ wallet }] = useConnectWallet()
  const arbitrumProvider = useArbitrumProvider()
  const arbitrumSigner = useArbitrumSigner()
  const dispatch = useDappDispatch()

  const account = wallet?.accounts[0]
  const address = account?.address ?? ""
  const avatar = account?.ens?.avatar?.url ?? ""

  useEffect(() => {
    if (arbitrumProvider) {
      dispatch(connectArbitrumProvider({ arbitrumProvider }))
    }
  }, [arbitrumProvider, dispatch])

  useEffect(() => {
    if (address && arbitrumSigner) {
      dispatch(
        connectWalletGlobally({
          address,
          avatar,
          arbitrumSigner,
        })
      )
      dispatch(fetchWalletBalances())
    } else {
      dispatch(disconnectWalletGlobally())
      dispatch(resetBalances())
    }
  }, [address, arbitrumSigner, avatar, dispatch])
}

export function useWalletOnboarding(): {
  walletOnboarded: string | null
  updateWalletOnboarding: (newValue: string) => void
} {
  const { value, updateStorage } =
    useLocalStorageChange<string>(LOCAL_STORAGE_WALLET)

  return { walletOnboarded: value, updateWalletOnboarding: updateStorage }
}

export function useConnect() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const { updateWalletOnboarding } = useWalletOnboarding()

  useEffect(() => {
    if (wallet?.provider !== undefined) {
      const setCorrectChain = async () => {
        const walletProvider = new ethers.providers.Web3Provider(
          wallet.provider
        )
        await walletProvider.send("wallet_switchEthereumChain", [
          { chainId: ARBITRUM_SEPOLIA.id },
        ])
      }

      setCorrectChain()
    }
  }, [wallet?.provider])

  const disconnectBound = useCallback(() => {
    updateWalletOnboarding("")
    return wallet && disconnect(wallet)
  }, [wallet, disconnect, updateWalletOnboarding])

  return { isConnected: !!wallet, connect, disconnect: disconnectBound }
}

// Hook is invoked when user switches accounts
export function useWalletChange() {
  const dispatch = useDappDispatch()

  const address = useDappSelector(selectWalletAddress)
  const isStaked = useDappSelector(selectDisplayedRealmId)

  const [currentAddress, setCurrentAddress] = useState("")

  const { updateWalletOnboarding } = useWalletOnboarding()
  const { assistant, updateAssistant } = useAssistant()

  useEffect(() => {
    if (!currentAddress) {
      setCurrentAddress(address)
      return
    }

    if (address !== currentAddress) {
      dispatch(resetBalances())
      dispatch(resetIsland())
      dispatch(resetClaiming())

      updateWalletOnboarding("")

      if (!assistant && !isStaked) {
        updateAssistant({ visible: true, type: "welcome" })
      }

      setCurrentAddress(address)
    }
  }, [
    currentAddress,
    address,
    updateWalletOnboarding,
    updateAssistant,
    dispatch,
    assistant,
    isStaked,
  ])
}
