import React, { memo, useCallback, useEffect, useState } from "react"
// import RealmModal from "shared/components/RealmModal"
import backgroundImg from "public/dapp_island_bg.webp"
import {
  useValueRef,
  IslandContext,
  useAssistant,
  useAssets,
} from "shared/hooks"
import {
  selectRealmNameById,
  // selectIsDefaultIslandMode,
  setDisplayedRealmId,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import FullPageLoader from "shared/components/FullPageLoader"
import { usePostHog } from "posthog-js/react"
import RealmPanel from "shared/components/RealmPanel"
import InteractiveIsland from "./InteractiveIsland"
// import RealmDetails from "./RealmDetails"
// import Quests from "./RealmDetails/Quests"
import IslandPresence from "./IslandPresence"

function IslandWrapper() {
  const assetsLoaded = useAssets([backgroundImg])
  const [realmId, setRealmId] = useState<null | string>(null)
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

  useEffect(() => {
    dispatch(setDisplayedRealmId(realmId))
  }, [dispatch, realmId])

  const contextRef = useValueRef(() => ({
    onRealmClick: (id: string) => {
      setRealmId(String(id))
      if (assistantVisible("welcome"))
        updateAssistant({ visible: false, type: "default" })
    },
  }))

  // const isDefaultIslandMode = useDappSelector(selectIsDefaultIslandMode)

  const handleClose = useCallback(() => setRealmId(null), [])

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
          {realmId && (
            // <RealmModal onClose={handleClose}>
            //   {isDefaultIslandMode ? (
            //     <RealmDetails onClose={handleClose} />
            //   ) : (
            //     // TODO: update if claim flow will be used
            //     <Quests />
            //   )}
            // </RealmModal>
            <RealmPanel onClose={handleClose} />
          )}
        </IslandContext.Provider>
      </div>
    </>
  )
}

export default memo(IslandWrapper)
