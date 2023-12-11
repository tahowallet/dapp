import React, { memo, useEffect } from "react"
import backgroundImg from "public/dapp_island_bg.webp"
import {
  useValueRef,
  IslandContext,
  useAssets,
  usePanelRealmClose,
  useOnRealmClick,
} from "shared/hooks"
import {
  selectDisplayedRealmId,
  selectRealmNameById,
  useDappSelector,
} from "redux-state"
import FullPageLoader from "shared/components/Loaders/FullPageLoader"
import { usePostHog } from "posthog-js/react"
import RealmPanel from "ui/Island/RealmPanel"
import InteractiveIsland from "./Background/InteractiveIsland"
import IslandPresence from "./Reflect/IslandPresence"

function IslandWrapper() {
  const assetsLoaded = useAssets([backgroundImg])
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realmName = useDappSelector((state) =>
    selectRealmNameById(state, realmId)
  )

  const posthog = usePostHog()
  const onRealmClick = useOnRealmClick()
  const handlePanelClose = usePanelRealmClose()

  useEffect(() => {
    if (realmName) {
      posthog?.capture("Realm opened", { realmName })
    }
  }, [posthog, realmName])

  const contextRef = useValueRef(() => ({ onRealmClick }))

  return (
    <>
      <FullPageLoader loaded={assetsLoaded} />
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
          <InteractiveIsland />
          {process.env.DISABLE_REFLECT === "true" ? null : <IslandPresence />}
          <RealmPanel onClose={handlePanelClose} />
        </IslandContext.Provider>
      </div>
    </>
  )
}

export default memo(IslandWrapper)
