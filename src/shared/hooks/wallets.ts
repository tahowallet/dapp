import { useConnectWallet } from "@web3-onboard/react"
import { useCallback, useEffect, useMemo } from "react"
import { ethers } from "ethers"
import {
  useDispatch,
  useSelector,
  selectWalletAddress,
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
  const dispatch = useDispatch()

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

export function useSendTransaction() {
  const provider = useArbitrumProvider()
  const address = useSelector(selectWalletAddress)

  if (!provider) return { isReady: false, send: async () => {} }

  const signer = provider.getSigner()

  const send = async <T>(
    transactionBuilder: (
      provider: ethers.providers.Provider,
      address: string,
      data: T
    ) => Promise<Partial<ethers.providers.TransactionRequest> | null>,
    data: T
  ): Promise<ethers.providers.TransactionReceipt | null> => {
    const txDetails = await transactionBuilder(provider, address, data)

    if (!txDetails) return null

    try {
      const transaction = await signer.sendTransaction({
        from: address,
        nonce: await provider.getTransactionCount(address, "latest"),
        ...txDetails,
      })
      const receipt = await transaction.wait()
      return receipt
    } catch (e) {
      return null
    }
  }

  return { isReady: true, send }
}
