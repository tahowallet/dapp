import { useConnectWallet } from "@web3-onboard/react"
import { useCallback } from "react"
import { truncateAddress } from "./utils"
import portrait from "./assets/portrait.png"

export function useAccount() {
  const [{ wallet }] = useConnectWallet()

  const account = wallet?.accounts[0]

  if (!account) {
    return {
      isConnected: false,
      address: "",
      name: "",
      avatar: portrait,
    }
  }

  return {
    isConnected: true,
    address: account?.address,
    name:
      account.ens?.name ??
      account.uns?.name ??
      truncateAddress(account.address),
    avatar: account.ens?.avatar ?? portrait,
  }
}

export function useConnect() {
  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const disconnectBound = useCallback(
    () => wallet && disconnect(wallet),
    [wallet, disconnect]
  )

  return { isConnected: !!wallet, connect, disconnect: disconnectBound }
}
