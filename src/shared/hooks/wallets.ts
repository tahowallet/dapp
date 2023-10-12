import { useConnectWallet } from "@web3-onboard/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ethers } from "ethers"
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
} from "redux-state"
import { BALANCE_UPDATE_INTERVAL, LOCAL_STORAGE_WALLET } from "shared/constants"
import { useAssistant } from "./assistant"
import { useInterval, useLocalStorageChange } from "./helpers"

export function useArbitrumProvider(): ethers.providers.Web3Provider | null {
  const [{ wallet }] = useConnectWallet()

  const arbitrumProvider = useMemo(
    () =>
      wallet?.provider
        ? new ethers.providers.Web3Provider(wallet.provider)
        : null,
    [wallet?.provider]
  )

  return arbitrumProvider
}

// Balance update is set to 30 seconds for now to ensure it is not too frequent
// but it can be adjusted if needed. We should be able to fetch balances when needed by
// using the `fetchWalletBalances` action. This hook is just to ensure balances are
// updated periodically.
export function useBalanceFetch() {
  const dispatch = useDappDispatch()
  const account = useDappSelector(selectWalletAddress)
  const walletBalancesCallback = useCallback(() => {
    if (account && dispatch) {
      dispatch(fetchWalletBalances())
    }
  }, [account, dispatch])

  useInterval(walletBalancesCallback, account ? BALANCE_UPDATE_INTERVAL : null)
}

export function useWallet() {
  const [{ wallet }] = useConnectWallet()
  const arbitrumProvider = useArbitrumProvider()
  const dispatch = useDappDispatch()

  const account = wallet?.accounts[0]
  const address = account?.address ?? ""
  const avatar = account?.ens?.avatar?.url ?? ""

  useEffect(() => {
    if (address && arbitrumProvider) {
      dispatch(connectWalletGlobally({ address, avatar, arbitrumProvider }))
      dispatch(fetchWalletBalances())
    } else {
      dispatch(disconnectWalletGlobally())
      dispatch(resetBalances())
    }
  }, [address, arbitrumProvider, avatar, dispatch])
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
  const [currentAddress, setCurrentAddress] = useState("")
  const { updateWalletOnboarding } = useWalletOnboarding()
  const { updateAssistant } = useAssistant()

  useEffect(() => {
    if (!currentAddress) setCurrentAddres(address)

    if (address !== currentAddress) {
      dispatch(resetIsland())
      dispatch(resetClaiming())

      updateWalletOnboarding("")
      updateAssistant({ visible: true, type: "welcome" })
      setCurrentAddres(address)
    }
  }, [
    currentAddress,
    address,
    updateWalletOnboarding,
    updateAssistant,
    dispatch,
  ])
}
