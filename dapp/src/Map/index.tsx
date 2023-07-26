import React, { useState } from "react"
import InteractiveMap from "./InteractiveMap"
import { MapContext } from "./MapContext"
import { useValueRef } from "./utils"
import Modal from "../shared/Modal"

const MemoizedInteractiveMap = React.memo(InteractiveMap)

export default function MapWrapper() {
  const [zoneData, setZoneData] = useState<null | string>(null)

  const contextRef = useValueRef(() => ({
    onZoneClick: setZoneData,
  }))

  return (
    <>
      <MapContext.Provider value={contextRef}>
        <MemoizedInteractiveMap />
      </MapContext.Provider>
      {zoneData && (
        <Modal>
          {/* tester */}
          <button type="button" onClick={() => setZoneData(null)}>
            Modal, {zoneData}
          </button>
        </Modal>
      )}
    </>
  )
}
