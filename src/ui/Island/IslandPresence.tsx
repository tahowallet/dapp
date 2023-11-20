import React from "react"
import { useReflectCursors } from "shared/hooks"
import IslandCursor from "./Cursor"

export default function IslandPresence() {
  const visibleCursors = useReflectCursors()

  if (!visibleCursors || !visibleCursors.length) return null

  return visibleCursors.map(({ id, cursor, userInfo }, index) => (
    <IslandCursor
      key={id}
      cursor={cursor}
      userInfo={userInfo}
      extraCursor={index !== 0}
    />
  ))
}
