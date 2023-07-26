import React, { MutableRefObject, useContext } from "react"

export const MapContext = React.createContext<MutableRefObject<MapContextType>>(
  {
    current: {
      onZoneClick: () => {},
    },
  }
)

export type MapContextType = {
  onZoneClick: (id: string) => void
}

export function useMapContext() {
  return useContext(MapContext)
}
