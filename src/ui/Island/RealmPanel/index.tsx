import React from "react"
import { usePanelRealmClose, useTabletScreen } from "shared/hooks"
import { selectRealmPanelVisible, useDappSelector } from "redux-state"
import ClickableModalOverlay from "shared/components/Dialogs/ClickableModalOverlay"
import Panel from "shared/components/Dialogs/Panel"
import RealmDetailsPanel from "./RealmDetailsPanel"
import RealmLeaderboardPanel from "./RealmLeaderboardPanel"
import RealmPanelCountdown from "./RealmPanelCountdown"
import RealmPanelCloseButton from "./RealmPanelCloseButton"

export default function RealmPanel({ onClose }: { onClose: () => void }) {
  const isTablet = useTabletScreen()
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)
  const handlePanelClose = usePanelRealmClose()

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
      {realmPanelVisible && <ClickableModalOverlay close={handlePanelClose} />}
    </>
  )
}
