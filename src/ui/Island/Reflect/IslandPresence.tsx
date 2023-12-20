import React from "react"
import { useReflectCursors } from "shared/hooks"
import IslandCursor from "./IslandCursor"

export default function IslandPresence() {
  const { visibleCursors, currentUser } = useReflectCursors()
  const reflectEnabled = process.env.SHOW_REFLECT === "true"

  if (
    !visibleCursors ||
    !visibleCursors.length ||
    !currentUser ||
    !reflectEnabled
  )
    return null

  return visibleCursors.map(({ id, cursor, userInfo }) => {
    if (!cursor) return null

    return (
      <IslandCursor
        key={id}
        cursor={cursor}
        userInfo={userInfo}
        extraCursor={id !== currentUser.id}
      />
    )
  })
}
