import React from "react"
import { useReflectCurrentUser, useReflectPresence } from "shared/hooks"
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
  const reflectClients = useReflectPresence(reflect)
  const currentUser = useReflectCurrentUser(reflect)

  if (!currentUser) return null

  // Get 9 recently entered users
  const otherClients = reflectClients
    .filter((client) => client.id !== currentUser.id)
    .slice(-9)

  // Visible cursor limited to 10 (current user and 9 recently joined)
  const visibleCursors = [currentUser, ...otherClients]

  return visibleCursors.map(({ id, cursor, userInfo }) => (
    <IslandCursor key={id} cursor={cursor} userInfo={userInfo} />
  ))
}
