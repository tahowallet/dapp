import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { selectIsDefaultIslandMode } from "redux-state/selectors/island"
import RegionModal from "shared/components/RealmModal"
import backgroundImg from "public/dapp_island_bg.webp"
import { useValueRef } from "shared/hooks"
import {
  setDisplayedRegionId,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import InteractiveIsland from "./InteractiveIsland"
import { IslandContext } from "../../shared/hooks/island"
import RegionDetails from "./RealmDetails"
import Rewards from "./RealmDetails/Rewards"

const MemoizedInteractiveIsland = React.memo(InteractiveIsland)

export default function IslandWrapper() {
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

  const [realmId, setRegionId] = useState<null | string>(null)

  const dispatch = useDappDispatch()

  useEffect(() => {
    dispatch(setDisplayedRegionId(realmId))
  }, [dispatch, realmId])

  const contextRef = useValueRef(() => ({
    onRegionClick: (id: string) => {
      setRegionId(String(id))
    },
  }))

  const isDefaultIslandMode = useDappSelector(selectIsDefaultIslandMode)

  const handleClose = useCallback(() => setRegionId(null), [])

  if (!assetsLoaded) {
    return null
  }

  return (
    <div className="island_container">
      <style jsx>
        {`
          .island_container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            z-index: var(--z-island);
          }
        `}
      </style>
      <IslandContext.Provider value={contextRef}>
        <MemoizedInteractiveIsland />
        {realmId && (
          <RegionModal onClose={handleClose}>
            {isDefaultIslandMode ? (
              <RegionDetails onClose={handleClose} />
            ) : (
              // TODO: update if claim flow will be used
              <Rewards />
            )}
          </RegionModal>
        )}
      </IslandContext.Provider>
    </div>
  )
}
