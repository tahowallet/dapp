import React, { useMemo } from "react"
import { Image as KonvaImage } from "react-konva"
import useImage from "use-image"

import zones from "./zones-data"
import Zone from "./Zone"
import { createCutoutFromPath } from "./utils"
import backgroundImg from "../public/dapp_map_bg.webp"

export default function MapZones() {
  const [bg] = useImage(backgroundImg)
  const zoneImgLayers = useMemo(() => {
    if (!bg) {
      return []
    }

    return zones.map((zone) => ({ zone, crop: createCutoutFromPath(zone, bg) }))
  }, [bg])

  const crops = useMemo(
    () =>
      zoneImgLayers.map(({ zone, crop }) => (
        <KonvaImage
          listening={false}
          key={zone.id}
          image={crop}
          x={zone.x}
          y={zone.y}
        />
      )),
    [zoneImgLayers]
  )

  return (
    <>
      {crops}
      {zones.map((zone) => (
        <Zone
          id={zone.id.toString()}
          key={zone.id}
          width={zone.w}
          height={zone.h}
          x={zone.x}
          y={zone.y}
          path={zone.path}
        />
      ))}
    </>
  )
}
