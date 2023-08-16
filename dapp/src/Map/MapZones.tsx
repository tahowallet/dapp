import React, { useMemo } from "react"
import useImage from "use-image"

import { zones } from "./constants"
import Zone from "./Zone"
import { createCutoutFromPath } from "./utils"
import backgroundImg from "../public/dapp_map_bg.webp"

export default function MapZones() {
  const [bg] = useImage(backgroundImg)
  const zoneImgLayers = useMemo(() => {
    if (!bg) {
      return []
    }

    return zones.map((zone) => ({
      zone,
      layer: createCutoutFromPath(zone, bg),
    }))
  }, [bg])

  return (
    <>
      {zoneImgLayers.map(({ zone, layer: crop }) => (
        <Zone
          key={zone.id}
          id={zone.id}
          imageLayer={crop}
          color={zone.color}
          name={zone.name}
          width={zone.w}
          height={zone.h}
          x={zone.x}
          y={zone.y}
          labelX={zone.labelX}
          labelY={zone.labelY}
          path={zone.path}
        />
      ))}
    </>
  )
}
