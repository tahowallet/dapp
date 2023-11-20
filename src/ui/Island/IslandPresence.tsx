import React from "react"
import { useReflectCursors } from "shared/hooks"
import IslandCursor from "./Cursor"

export default function IslandPresence() {
  const visibleCursors = useReflectCursors()
  const reflectEnabled = process.env.SHOW_REFLECT === "true"

  if (!visibleCursors || !visibleCursors.length || !reflectEnabled) return null

  return visibleCursors.map(({ id, cursor, userInfo }, index) => {
    if (!cursor) return null

    return (
      <IslandCursor
        key={id}
        cursor={cursor}
        userInfo={userInfo}
        extraCursor={index !== 0}
      />
    )
  })
}
