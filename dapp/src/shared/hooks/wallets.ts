import { useConnectWallet, useSetChain } from "@web3-onboard/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ethers } from "ethers"
import { ConnectedChain } from "@web3-onboard/core"
import { truncateAddress } from "../utils"
import portrait from "../assets/portrait.png"
import { useAddressToNameResolution } from "./names"

type WalletState = {
  isConnected: boolean
  address: string
  name: string
  truncatedAddress: string
  avatar: string
  provider: null | ethers.providers.Web3Provider
  connectedChain: null | ConnectedChain
}

export function useWallet(): WalletState {
  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }] = useSetChain()
  const resolveAddressToName = useAddressToNameResolution()
  const [name, setName] = useState("")

  const arbitrumProvider = useMemo(
    () =>
      wallet?.provider
        ? new ethers.providers.Web3Provider(wallet.provider)
        : null,
    [wallet?.provider]
  )

  const account = wallet?.accounts[0]

  useEffect(() => {
    const resolveName = async (address: string) => {
      const resolvedName = await resolveAddressToName(address)
      setName(resolvedName ?? "")
    }
    if (!account) {
      setName("")
    } else {
      resolveName(account.address)
    }
  }, [account, resolveAddressToName])

  const walletState = useMemo<WalletState>(() => {
    if (!account) {
      return {
        isConnected: false,
        address: "",
        name,
        truncatedAddress: "",
        avatar: portrait,
        provider: null,
        connectedChain: null,
      }
    }

    return {
      isConnected: true,
      address: account.address,
      name,
      truncatedAddress: truncateAddress(account.address),
      avatar: account.ens?.avatar?.url ?? portrait,
      provider: arbitrumProvider,
      connectedChain,
    }
  }, [account, name, arbitrumProvider, connectedChain])

  return walletState
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