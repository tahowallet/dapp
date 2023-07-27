import React, { useState } from "react"
import InteractiveMap from "./InteractiveMap"
import { MapContext } from "./MapContext"
import { useValueRef } from "./utils"
import Modal from "../shared/Modal"
import { MapZoneCutout, MapZoneBackgroundCutout } from "./MapCutout"

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
              <div className="zone_header_bg">
                <MapZoneBackgroundCutout zoneId={zoneData} />
              </div>
              <div className="zone_thumb">
                <MapZoneCutout zoneId={zoneData} />
              </div>
              <button type="button" onClick={() => setZoneData(null)}>
                Modal, {zoneData}
              </button>
            </div>
          </Modal>
        </>
      )}
      <style jsx>{`
        .zone_thumb {
          position: absolute;
          right: 0;
          transform: translateY(-25%) translateX(25%);
        }

        .zone_header_bg {
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          right: 0;
        }
      `}</style>
    </div>
  )
}
