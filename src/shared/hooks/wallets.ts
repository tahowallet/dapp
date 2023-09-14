import { useConnectWallet } from "@web3-onboard/react"
import { useCallback, useEffect, useMemo } from "react"
import { ethers } from "ethers"
import {
  useDappDispatch,
  connectWalletGlobally,
  disconnectWalletGlobally,
} from "redux-state"

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

export function useWallet() {
  const [{ wallet }] = useConnectWallet()
  const dispatch = useDappDispatch()

  const account = wallet?.accounts[0]
  const address = account?.address ?? ""
  const avatar = account?.ens?.avatar?.url ?? ""

  useEffect(() => {
    if (address) {
      dispatch(connectWalletGlobally({ address, avatar }))
    } else {
      dispatch(disconnectWalletGlobally())
    }
  }, [address, avatar, dispatch])
}

export function useConnect() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const disconnectBound = useCallback(
    () => wallet && disconnect(wallet),
    [wallet, disconnect]
  )

  return { isConnected: !!wallet, connect, disconnect: disconnectBound }
}
