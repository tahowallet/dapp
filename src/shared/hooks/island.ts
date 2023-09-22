import React, { MutableRefObject, useContext, useEffect, useState } from "react"
import { useDappDispatch } from "redux-state"
import { fetchRegionAddresses } from "redux-state/thunks/island"
import { useArbitrumProvider } from "./wallets"

export const IslandContext = React.createContext<
  MutableRefObject<IslandContextType>
>({
  current: {
    onRegionClick: () => {},
  },
})

export type IslandContextType = {
  onRegionClick: (id: string) => void
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
      await dispatch(fetchRegionAddresses())
      setHasAlreadyFetched(true)
    }

    fetchRealms()
  }, [provider, hasAlreadyFetched, dispatch])
}
