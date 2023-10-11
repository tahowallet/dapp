import React, { memo, useCallback, useEffect, useState } from "react"
import { selectIsDefaultIslandMode } from "redux-state/selectors/island"
import RealmModal from "shared/components/RealmModal"
import backgroundImg from "public/dapp_island_bg.webp"
import {
  useValueRef,
  IslandContext,
  useAssistant,
  useAssets,
} from "shared/hooks"
import {
  setDisplayedRealmId,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import FullPageLoader from "shared/components/FullPageLoader"
import InteractiveIsland from "./InteractiveIsland"
import RealmDetails from "./RealmDetails"
import Quests from "./RealmDetails/Quests"

function IslandWrapper() {
  const assetsLoaded = useAssets([backgroundImg])
  const [realmId, setRealmId] = useState<null | string>(null)

  const dispatch = useDappDispatch()

  const { updateAssistant, assistantVisible } = useAssistant()

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

  const isDefaultIslandMode = useDappSelector(selectIsDefaultIslandMode)

  const handleClose = useCallback(() => setRealmId(null), [])

  if (!assetsLoaded) return <FullPageLoader />

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
        <InteractiveIsland />
        {realmId && (
          <RealmModal onClose={handleClose}>
            {isDefaultIslandMode ? (
              <RealmDetails onClose={handleClose} />
            ) : (
              // TODO: update if claim flow will be used
              <Quests />
            )}
          </RealmModal>
        )}
      </IslandContext.Provider>
    </div>
  )
}

export default memo(IslandWrapper)
