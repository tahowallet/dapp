import React, { MutableRefObject, useContext } from "react"

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
