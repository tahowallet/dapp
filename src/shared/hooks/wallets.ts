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
} from "redux-state"
import { BALANCE_UPDATE_INTERVAL, LOCAL_STORAGE_WALLET } from "shared/constants"
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
  const [balanceFetched, setBalanceFetched] = useState(false)

  const walletBalancesCallback = useCallback(async () => {
    if (account && dispatch) {
      await dispatch(fetchWalletBalances())
      setBalanceFetched(true)
    }
  }, [account, dispatch])

  useInterval(walletBalancesCallback, account ? BALANCE_UPDATE_INTERVAL : null)

  return balanceFetched
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
