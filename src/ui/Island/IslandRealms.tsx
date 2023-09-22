import React, { useMemo } from "react"
import useImage from "use-image"

import backgroundImg from "public/dapp_island_bg.webp"
import { realms } from "shared/constants"
import { createCutoutFromPath } from "shared/utils"
import Region from "./Realm"

export default function IslandRealms() {
  const [bg] = useImage(backgroundImg)
  const realmImgLayers = useMemo(() => {
    if (!bg) {
      return []
    }

    return realms.map((realm) => ({
      realm,
      layer: createCutoutFromPath(realm, bg),
    }))
  }, [bg])

  return (
    <>
      {realmImgLayers.map(({ realm, layer: crop }) => (
        <Region
          key={realm.id}
          id={realm.id}
          imageLayer={crop}
          color={realm.color}
          name={realm.name}
          width={realm.w}
          height={realm.h}
          x={realm.x}
          y={realm.y}
          labelX={realm.labelX}
          labelY={realm.labelY}
          path={realm.paths[0].data}
        />
      ))}
    </>
  )
}
