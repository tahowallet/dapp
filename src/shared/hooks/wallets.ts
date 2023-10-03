import { useConnectWallet } from "@web3-onboard/react"
import { useCallback, useEffect, useMemo } from "react"
import { ethers } from "ethers"
import {
  useDappDispatch,
  connectWalletGlobally,
  disconnectWalletGlobally,
  useDappSelector,
  selectWalletAddress,
  fetchWalletBalances,
  resetBalances,
  updateWalletOnboarding,
} from "redux-state"
import { BALANCE_UPDATE_INTERVAL } from "shared/constants"
import { useInterval } from "./helpers"

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

export function useConnect() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const dispatch = useDappDispatch()

  const disconnectBound = useCallback(() => {
    dispatch(updateWalletOnboarding(false))
    return wallet && disconnect(wallet)
  }, [wallet, disconnect, dispatch])

  return { isConnected: !!wallet, connect, disconnect: disconnectBound }
}
