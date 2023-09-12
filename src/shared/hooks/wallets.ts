import { useConnectWallet } from "@web3-onboard/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ethers } from "ethers"
import {
  useDispatch,
  useSelector,
  selectWalletAddress,
  connectWalletGlobally,
  disconnectWalletGlobally,
  selectRegions,
  setRegionAddresses,
} from "redux-state"
import { TransactionProgressStatus } from "shared/types"
import { getRegionAddresses } from "shared/contracts"

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

export function useSendTransaction<T>(
  transactionBuilder: (
    provider: ethers.providers.Provider,
    address: string,
    data: T
  ) => Promise<ethers.providers.TransactionRequest | null>
):
  | {
      status: TransactionProgressStatus
      isReady: false
      send: null
    }
  | {
      status: TransactionProgressStatus
      isReady: true
      send: (
        data: T,
        contractAddress?: string
      ) => Promise<ethers.providers.TransactionReceipt | null>
    } {
  const provider = useArbitrumProvider()
  const address = useSelector(selectWalletAddress)
  const [status, setStatus] = useState<TransactionProgressStatus>(
    TransactionProgressStatus.Idle
  )

  if (!provider) return { isReady: false, send: null, status }

  const signer = provider.getSigner()

  const send = async (
    data: T,
    contractAddress?: string
  ): Promise<ethers.providers.TransactionReceipt | null> => {
    const txDetails = await transactionBuilder(
      provider,
      contractAddress || address,
      data
    )

    if (!txDetails) {
      setStatus(TransactionProgressStatus.Idle)
      return null
    }

    try {
      setStatus(TransactionProgressStatus.Signing)
      const transaction = await signer.sendTransaction({
        from: address,
        nonce: await provider.getTransactionCount(address, "latest"),
        ...txDetails,
      })

      setStatus(TransactionProgressStatus.Sending)

      const receipt = await transaction.wait()

      setStatus(TransactionProgressStatus.Done)

      return receipt
    } catch (e) {
      setStatus(TransactionProgressStatus.Idle)
      return null
    }
  }

  return { isReady: true, send, status }
}

export function useFetchRegionsContracts() {
  const dispatch = useDispatch()
  const provider = useArbitrumProvider()
  const regionsById = useSelector(selectRegions)
  const [hasAlreadyFetched, setHasAlreadyFetched] = useState(false)

  useEffect(() => {
    if (!provider || hasAlreadyFetched) return

    const fetch = async () => {
      const regions = Object.entries(regionsById)
        .filter(([__, { regionContractAddress }]) => !regionContractAddress)
        .map(([id, data]) => ({ id, data }))

      const regionAddresses = await getRegionAddresses(provider, {
        regions,
      })

      setHasAlreadyFetched(true)
      dispatch(setRegionAddresses(regionAddresses))
    }

    fetch()
  }, [provider, hasAlreadyFetched, regionsById, dispatch])
}
