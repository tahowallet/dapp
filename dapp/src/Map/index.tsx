import React, { useState } from "react"
import InteractiveMap from "./InteractiveMap"
import { MapContext } from "./MapContext"
import { useValueRef } from "./utils"
import Modal from "../shared/Modal"

const MemoizedInteractiveMap = React.memo(InteractiveMap)

export default function MapWrapper() {
  const [zoneData, setZoneData] = useState<null | string>(null)

  const contextRef = useValueRef(() => ({
    onZoneClick: (id) => {
      setZoneData(id)
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
          .modal_content {
            width: 555px;
            height: 496px;
          }

          .modal_overlay {
            background: var(--primary-p1-100);
            inset: 0;
            position: absolute;
            z-index: 1;
            opacity: 0;
            animation: toggleOverlay 0.3s ease-out forwards;
          }

          @keyframes toggleOverlay {
            from {
              opacity: 0;
            }

            to {
              opacity: 0.8;
            }
          }
        `}
      </style>
      <MapContext.Provider value={contextRef}>
        <MemoizedInteractiveMap />
      </MapContext.Provider>
      {zoneData && (
        <>
          <div className="modal_overlay" />
          <Modal>
            <div className="modal_content">
              <button type="button" onClick={() => setZoneData(null)}>
                Modal, {zoneData}
              </button>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}
