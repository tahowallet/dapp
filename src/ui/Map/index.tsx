import React, { useCallback, useLayoutEffect, useState } from "react"
import { selectIsDefaultMapMode } from "redux-state/selectors/map"
import { useSelector } from "react-redux"
import RegionModal from "shared/components/RegionModal"
import backgroundImg from "public/dapp_map_bg.webp"
import { useValueRef } from "shared/hooks"
import InteractiveMap from "./InteractiveMap"
import { MapContext } from "../../shared/hooks/map"
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

  const isDefaultMapMode = useSelector(selectIsDefaultMapMode)

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
        {regionId && (
          <RegionModal regionId={regionId} onClose={handleClose}>
            {isDefaultMapMode ? (
              <RegionDetails regionId={regionId} onClose={handleClose} />
            ) : (
              <JoinRegion regionId={regionId} />
            )}
          </RegionModal>
        )}
      </MapContext.Provider>
    </div>
  )
}
