import React, { useEffect } from "react"
import { useAssistant, useLocalStorageChange } from "shared/hooks"
import { LOCAL_STORAGE_VISITED_REALM } from "shared/constants"
import RealmDetailsPanel from "./RealmDetailsPanel"
import RealmLeaderboardPanel from "./RealmLeaderboardPanel"
import RealmPanelCountdown from "./RealmPanelCountdown"
import RealmPanelCloseButton from "./RealmPanelCloseButton"

export default function RealmPanel({ onClose }: { onClose: () => void }) {
  const { updateAssistant } = useAssistant()
  const { value, updateStorage } = useLocalStorageChange<boolean>(
    LOCAL_STORAGE_VISITED_REALM
  )

  useEffect(() => {
    if (value) return
    updateStorage(true)
    updateAssistant({ visible: true, type: "first-realm" })
  }, [value, updateStorage, updateAssistant])

  return (
    <>
      <RealmDetailsPanel />
      <RealmPanelCloseButton onClose={onClose} />
      <RealmLeaderboardPanel />
      <RealmPanelCountdown />
    </>
  )
}
