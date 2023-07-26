import React from "react"
import zones from "./zones-data"
import Zone from "./Zone"

export default function MapZones() {
  return (
    <>
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
