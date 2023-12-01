import React, { memo, useCallback, useEffect } from "react"
import backgroundImg from "public/dapp_island_bg.webp"
import {
  useValueRef,
  IslandContext,
  useAssistant,
  useAssets,
} from "shared/hooks"
import {
  selectDisplayedRealmId,
  selectRealmNameById,
  setDisplayedRealmId,
  setRealmPanelVisible,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import FullPageLoader from "shared/components/FullPageLoader"
import { usePostHog } from "posthog-js/react"
import RealmPanel from "shared/components/RealmPanel"
import { REALM_PANEL_ANIMATION_TIME } from "shared/constants"
import InteractiveIsland from "./InteractiveIsland"
import IslandPresence from "./IslandPresence"

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

  const handleClose = useCallback(() => {
    dispatch(setRealmPanelVisible(false))

    const timeout = setTimeout(
      () => dispatch(setDisplayedRealmId(null)),
      REALM_PANEL_ANIMATION_TIME
    )

    return () => clearTimeout(timeout)
  }, [dispatch])

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
