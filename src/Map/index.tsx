import React, { useCallback, useLayoutEffect, useState } from "react"
import { selectMapMode } from "redux-state/selectors/map"
import { useSelector } from "react-redux"
import RegionModal from "shared/components/RegionModal"
import InteractiveMap from "./InteractiveMap"
import { MapContext } from "./MapContext"
import { useValueRef } from "./utils"
import backgroundImg from "../public/dapp_map_bg.webp"
import JoinRegion from "./JoinRegion"
import RegionDetails from "./RegionDetails"

const MemoizedInteractiveMap = React.memo(InteractiveMap)

export default function MapWrapper() {
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useLayoutEffect(() => {
    const assets = [backgroundImg]
    let loaded = 0
    assets.forEach((asset) => {
      const img = new Image()
      img.src = asset
      img.onload = () => {
        loaded += 1
        if (loaded === assets.length) {
          setAssetsLoaded(true)
        }
      }
    })
  }, [])

  const [regionId, setRegionId] = useState<null | string>(null)

  const contextRef = useValueRef(() => ({
    onRegionClick: (id: string) => {
      setRegionId(String(id))
    },
  }))

  const mapMode = useSelector(selectMapMode)

  const handleClose = useCallback(() => setRegionId(null), [])

  if (!assetsLoaded) {
    return null
  }

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
      {regionId && (
        <RegionModal regionId={regionId} onClose={handleClose}>
          {mapMode === "default" ? (
            <RegionDetails />
          ) : (
            <JoinRegion onClose={handleClose} regionId={regionId} />
          )}
        </RegionModal>
      )}
    </div>
  )
}
