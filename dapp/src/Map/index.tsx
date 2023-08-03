import React, { useState } from "react"
import InteractiveMap from "./InteractiveMap"
import ZoneModal from "./ZoneModal"
import { MapContext } from "./MapContext"
import { useValueRef } from "./utils"

const MemoizedInteractiveMap = React.memo(InteractiveMap)

export default function MapWrapper() {
  const [zoneData, setZoneData] = useState<null | string>(null)

  const contextRef = useValueRef(() => ({
    onZoneClick: (id: string) => {
      setZoneData(String(id))
    },
  }))

  return (
    <div className="map_container">
      <style jsx>
        {`
          .map_container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            z-index: var(--z-map);
          }
        `}
      </style>
      <MapContext.Provider value={contextRef}>
        <MemoizedInteractiveMap />
      </MapContext.Provider>
      {zoneData && (
        <ZoneModal zoneData={zoneData} onClose={() => setZoneData(null)} />
      )}
    </div>
  )
}
