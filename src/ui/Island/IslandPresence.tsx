import React from "react"
import { useReflectCursors } from "shared/hooks"
import {
  ReflectCursor,
  ReflectInstance,
  ReflectUserInfo,
} from "shared/services"

type IslandCursorProps = {
  cursor: ReflectCursor
  userInfo: ReflectUserInfo
}

function IslandCursor({ cursor, userInfo }: IslandCursorProps) {
  if (!cursor) return null

  const { name, stakingRealm, stakingRealmColor } = userInfo

  return (
    <>
      <div
        className="cursor_container"
        style={{ left: cursor.x + 10, top: cursor.y + 14 }}
      >
        <div>{name}</div>
        <div>{stakingRealm}</div>
      </div>
      <style jsx>{`
        .cursor_container {
          background: ${stakingRealmColor ?? "var(--secondary-s1-100)"};
          color: ${stakingRealmColor
            ? "var(--secondary-s1-100)"
            : "var(--primary-p1-100)"};
          font-size: 10px;
          padding: 4px 8px;
          position: absolute;
          border-radius: 4px;
          cursor: none;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}

export default function IslandPresence({
  reflect,
}: {
  reflect: ReflectInstance
}) {
  const visibleCursors = useReflectCursors(reflect)

  if (!visibleCursors || !visibleCursors.length) return null

  return visibleCursors.map(({ id, cursor, userInfo }) => (
    <IslandCursor key={id} cursor={cursor} userInfo={userInfo} />
  ))
}
