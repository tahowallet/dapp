import React, { MutableRefObject, useContext, useEffect, useState } from "react"
import { fetchWalletBalances, useDappDispatch } from "redux-state"
import { fetchPopulation, fetchRealmAddresses } from "redux-state/thunks/island"
import { useArbitrumProvider } from "./wallets"

export const IslandContext = React.createContext<
  MutableRefObject<IslandContextType>
>({
  current: {
    onRealmClick: () => {},
  },
})

export type IslandContextType = {
  onRealmClick: (id: string) => void
}

export function useIslandContext() {
  return useContext(IslandContext)
}

export function useFetchRealmsContracts() {
  const dispatch = useDappDispatch()
  const provider = useArbitrumProvider()
  const [hasAlreadyFetched, setHasAlreadyFetched] = useState(false)

  useEffect(() => {
    if (!provider || hasAlreadyFetched) return

    const fetchRealms = async () => {
      await dispatch(fetchRealmAddresses())
      await dispatch(fetchWalletBalances())
      await dispatch(fetchPopulation())
      setHasAlreadyFetched(true)
    }

    fetchRealms()
  }, [provider, hasAlreadyFetched, dispatch])
}
