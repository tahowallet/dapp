import React, { MutableRefObject, useContext, useEffect, useState } from "react"
import { useDappDispatch } from "redux-state"
import { fetchRegionAddresses } from "redux-state/thunks/map"
import { useArbitrumProvider } from "./wallets"

export const MapContext = React.createContext<MutableRefObject<MapContextType>>(
  {
    current: {
      onRegionClick: () => {},
    },
  }
)

export type MapContextType = {
  onRegionClick: (id: string) => void
}

export function useMapContext() {
  return useContext(MapContext)
}

export function useFetchRegionsContracts() {
  const dispatch = useDappDispatch()
  const provider = useArbitrumProvider()
  const [hasAlreadyFetched, setHasAlreadyFetched] = useState(false)

  useEffect(() => {
    if (!provider || hasAlreadyFetched) return

    const fetchRegions = async () => {
      await dispatch(fetchRegionAddresses())
      setHasAlreadyFetched(true)
    }

    fetchRegions()
  }, [provider, hasAlreadyFetched, dispatch])
}
