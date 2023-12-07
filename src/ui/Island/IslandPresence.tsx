import React from "react"
import { useReflectCursors } from "shared/hooks"
import { selectRealmPanelVisible, useDappSelector } from "redux-state"
import IslandCursor from "./Cursor"

export default function IslandPresence() {
  const { visibleCursors, currentUser } = useReflectCursors()
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)

  const reflectEnabled = process.env.SHOW_REFLECT === "true"

  if (!visibleCursors.length || !currentUser || !reflectEnabled) return null

  return visibleCursors.map(({ id, cursor, userInfo }) => {
    const isCurrentUser = id === currentUser.id
    if (!cursor || (isCurrentUser && realmPanelVisible)) return null

    return (
      <IslandCursor
        key={id}
        cursor={cursor}
        userInfo={userInfo}
        extraCursor={!isCurrentUser}
      />
    )
  })
}
