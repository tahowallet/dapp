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
} from "redux-state"
import { ARBITRUM, BALANCE_UPDATE_INTERVAL } from "shared/constants"
import { useInterval } from "./helpers"

export function useArbitrumProvider(): ethers.providers.Provider | null {
  const [{ wallet }] = useConnectWallet()

  const arbitrumProvider = useMemo(() => {
    if (wallet?.provider !== undefined) {
      if (process.env.USE_ARBITRUM_FORK === "true") {
        return new ethers.providers.JsonRpcBatchProvider(ARBITRUM.rpcUrl)
      }

      return new ethers.providers.Web3Provider(wallet.provider)
    }
    return null
  }, [wallet?.provider])

  return arbitrumProvider
}

export function useArbitrumSigner(): ethers.providers.JsonRpcSigner | null {
  const [{ wallet }] = useConnectWallet()
  const arbitrumProvider = useArbitrumProvider()

  const arbitrumSigner = useMemo(() => {
    if (
      process.env.USE_ARBITRUM_FORK === "true" &&
      wallet?.provider !== undefined
    ) {
      return new ethers.providers.Web3Provider(wallet.provider).getSigner()
    }

    return arbitrumProvider instanceof ethers.providers.Web3Provider
      ? arbitrumProvider?.getSigner() ?? null
      : null
  }, [arbitrumProvider, wallet?.provider])

  return arbitrumSigner
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
  const arbitrumSigner = useArbitrumSigner()
  const dispatch = useDappDispatch()

  const account = wallet?.accounts[0]
  const address = account?.address ?? ""
  const avatar = account?.ens?.avatar?.url ?? ""

  useEffect(() => {
    if (address && arbitrumProvider && arbitrumSigner) {
      dispatch(
        connectWalletGlobally({
          address,
          avatar,
          arbitrumProvider,
          arbitrumSigner,
        })
      )
      dispatch(fetchWalletBalances())
    } else {
      dispatch(disconnectWalletGlobally())
      dispatch(resetBalances())
    }
  }, [address, arbitrumProvider, arbitrumSigner, avatar, dispatch])
}

export function useConnect() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const disconnectBound = useCallback(
    () => wallet && disconnect(wallet),
    [wallet, disconnect]
  )

  return { isConnected: !!wallet, connect, disconnect: disconnectBound }
}
