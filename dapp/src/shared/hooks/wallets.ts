import { useConnectWallet, useSetChain } from "@web3-onboard/react"
import { useCallback, useMemo } from "react"
import { ethers } from "ethers"
import { truncateAddress } from "../utils"
import portrait from "../assets/portrait.png"

export function useWallet() {
  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }] = useSetChain()

  const arbitrumProvider = useMemo(
    () =>
      wallet?.provider
        ? new ethers.providers.Web3Provider(wallet.provider)
        : null,
    [wallet?.provider]
  )

  const account = wallet?.accounts[0]

  if (!account) {
    return {
      isConnected: false,
      address: "",
      truncatedAddress: "",
      avatar: portrait,
      provider: null,
      connectedChain: null,
    }
  }

  return {
    isConnected: true,
    address: account.address,
    truncatedAddress: truncateAddress(account.address),
    avatar: account.ens?.avatar ?? portrait,
    provider: arbitrumProvider,
    connectedChain,
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

export function useSendTransaction() {
  const { address, provider } = useWallet()

  if (!provider) return { isReady: false, send: async () => {} }

  const signer = provider.getSigner()

  const send = async (
    txDetails: Partial<ethers.providers.TransactionRequest>
  ) =>
    signer.sendTransaction({
      from: address,
      nonce: await provider.getTransactionCount(address, "latest"),
      ...txDetails,
    })

  return { isReady: true, send }
}
