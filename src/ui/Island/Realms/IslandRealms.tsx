import React, { useMemo } from "react"
import useImage from "use-image"

import backgroundImg from "public/dapp_island_bg.webp"
import { createCutoutFromPath, createImageElement } from "shared/utils"
import {
  selectDisplayedRealmId,
  selectRealmPanelVisible,
  selectRealms,
  useDappSelector,
} from "redux-state"
import { REALMS_MAP_DATA } from "shared/constants"
import Realm from "./Realm"

export default function IslandRealms() {
  const realms = useDappSelector(selectRealms)
  const selectedRealmPanelVisible = useDappSelector(selectRealmPanelVisible)
  const selectedRealmId = useDappSelector(selectDisplayedRealmId)
  const [bg] = useImage(backgroundImg)
  const realmImgLayers = useMemo(() => {
    if (!bg) {
      return []
    }
    if (selectedRealmId && selectedRealmPanelVisible) {
      const selectedRealm = REALMS_MAP_DATA.find(
        (realm) => realm.id === selectedRealmId
      )
      if (selectedRealm) {
        const updatedRealm = {
          ...selectedRealm,
          name: realms[selectedRealmId].name,
        }
        return [
          {
            realm: updatedRealm,
            layers: createCutoutFromPath(selectedRealm, bg),
            partnerLogo: createImageElement(selectedRealm.partnerIcons.shadow),
            populationIcon: createImageElement(
              selectedRealm.partnerIcons.population
            ),
          },
        ]
      }
      return []
    }
    return REALMS_MAP_DATA.map((realm) => {
      const updatedRealm = {
        ...realm,
        name: realms[realm.id]?.name,
      }
      return {
        realm: updatedRealm,
        layers: createCutoutFromPath(realm, bg),
        partnerLogo: createImageElement(realm.partnerIcons.shadow),
        populationIcon: createImageElement(realm.partnerIcons.population),
      }
    })
  }, [bg, realms, selectedRealmId, selectedRealmPanelVisible])

  return (
    <>
      {realmImgLayers.map(
        ({ realm, layers: crops, partnerLogo, populationIcon }) => (
          <Realm
            key={realm.id}
            id={realm.id}
            imageLayers={crops}
            color={realm.color}
            name={realm.name}
            width={realm.w}
            height={realm.h}
            x={realm.x}
            y={realm.y}
            labelX={realm.labelX}
            labelY={realm.labelY}
            paths={realm.paths.map((path) => path.data)}
            partnerLogo={partnerLogo}
            populationIcon={populationIcon}
            isNew={realm.isNew}
          />
        )
      )}
    </>
  )
}
