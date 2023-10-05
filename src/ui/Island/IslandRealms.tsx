import React, { useMemo } from "react"
import useImage from "use-image"

import backgroundImg from "public/dapp_island_bg.webp"
import { REALMS_WITH_CONTRACT_NAME, REALMS_MAP_DATA } from "shared/constants"
import { createCutoutFromPath } from "shared/utils"
import { selectRealms, useDappSelector } from "redux-state"
import Realm from "./Realm"

export default function IslandRealms() {
  const realms = useDappSelector(selectRealms)
  const [bg] = useImage(backgroundImg)
  const realmImgLayers = useMemo(() => {
    if (!bg) {
      return []
    }

    return REALMS_MAP_DATA.map((realm) => {
      const updatedRealm = {
        ...realm,
        name:
          // TODO: The name of the realm should be taken from the contracts.
          // At the moment, these aren't available. Let's use mocked data for this moment.
          realms[realm.id]?.name ||
          REALMS_WITH_CONTRACT_NAME[realm.id].realmName,
      }
      return { realm: updatedRealm, layer: createCutoutFromPath(realm, bg) }
    })
  }, [bg, realms])

  return (
    <>
      {realmImgLayers.map(({ realm, layer: crop }) => (
        <Realm
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
