import React, { useEffect } from "react"
import {
  useAssistant,
  useLocalStorageChange,
  usePanelRealmClose,
  useTabletScreen,
} from "shared/hooks"
import { LOCAL_STORAGE_VISITED_REALM } from "shared/constants"
import { selectRealmPanelVisible, useDappSelector } from "redux-state"
import ClickableModalOverlay from "shared/components/Dialogs/ClickableModalOverlay"
import RealmDetailsPanel from "./RealmDetailsPanel"
import RealmLeaderboardPanel from "./RealmLeaderboardPanel"
import RealmPanelCountdown from "./RealmPanelCountdown"
import RealmPanelCloseButton from "./RealmPanelCloseButton"
import Panel from "../../../shared/components/Dialogs/Panel"

export default function RealmPanel({ onClose }: { onClose: () => void }) {
  const { updateAssistant } = useAssistant()
  const isTablet = useTabletScreen()
  const { value, updateStorage } = useLocalStorageChange<boolean>(
    LOCAL_STORAGE_VISITED_REALM
  )

  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)
  const handleClickOutside = usePanelRealmClose()

  useEffect(() => {
    if (value) return
    updateStorage(true)
    updateAssistant({ visible: true, type: "first-realm" })
  }, [value, updateStorage, updateAssistant])

  return (
    <>
      <Panel.Container style={{ width: 481 }}>
        <RealmDetailsPanel />
        {isTablet && <RealmLeaderboardPanel />}
      </Panel.Container>
      <RealmPanelCloseButton onClose={onClose} />
      {!isTablet && (
        <Panel.Container position="right">
          <RealmLeaderboardPanel />
        </Panel.Container>
      )}
      <RealmPanelCountdown />
      {realmPanelVisible && (
        <ClickableModalOverlay close={handleClickOutside} />
      )}
    </>
  )
}
