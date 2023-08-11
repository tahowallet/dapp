import { useConnectWallet, useSetChain } from "@web3-onboard/react"
import { useCallback } from "react"
import { ethers } from "ethers"
import { truncateAddress } from "./utils"
import portrait from "./assets/portrait.png"

export function useAccount() {
  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }] = useSetChain()

  const account = wallet?.accounts[0]

  if (!account) {
    return {
      isConnected: false,
      address: "",
      name: "",
      avatar: portrait,
      provider: null,
      connectedChain: null,
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
    provider: wallet.provider,
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
  const { address, provider: walletProvider } = useAccount()

  if (!walletProvider) return { isReady: false, send: async () => {} }

  const provider = new ethers.providers.Web3Provider(walletProvider)

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
