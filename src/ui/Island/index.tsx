import React, { memo, useEffect } from "react"
import backgroundImg from "public/dapp_island_bg.webp"
import {
  useValueRef,
  IslandContext,
  useAssistant,
  useAssets,
  usePanelRealmClose,
} from "shared/hooks"
import {
  selectDisplayedRealmId,
  selectRealmNameById,
  setDisplayedRealmId,
  setRealmPanelVisible,
  useDappDispatch,
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

  const dispatch = useDappDispatch()

  const { updateAssistant, assistantVisible } = useAssistant()

  const posthog = usePostHog()

  useEffect(() => {
    if (realmName) {
      posthog?.capture("Realm opened", { realmName })
    }
  }, [posthog, realmName])

  const contextRef = useValueRef(() => ({
    onRealmClick: (id: string) => {
      if (!realmId) {
        dispatch(setDisplayedRealmId(String(id)))
        dispatch(setRealmPanelVisible(true))

        if (assistantVisible("welcome"))
          updateAssistant({ visible: false, type: "default" })
      }
    },
  }))

  const handleClose = usePanelRealmClose()

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
          <RealmPanel onClose={handleClose} />
        </IslandContext.Provider>
      </div>
    </>
  )
}

export default memo(IslandWrapper)
