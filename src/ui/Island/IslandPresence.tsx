import React from "react"
import { useReflectCurrentUserId, useReflectPresence } from "shared/hooks"
import {
  ReflectCursor,
  ReflectInstance,
  ReflectUserInfo,
} from "shared/services"

type IslandCursorProps = {
  id: string
  cursor: ReflectCursor
  userInfo: ReflectUserInfo
  currentUser: string | null
}

function IslandCursor({
  id,
  cursor,
  userInfo,
  currentUser,
}: IslandCursorProps) {
  const isCurrentUserCursor = id === currentUser

  if (isCurrentUserCursor || !cursor) return null

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
  const currentUser = useReflectCurrentUserId(reflect)

  return reflectClients.map(({ id, cursor, userInfo }) => (
    <IslandCursor
      key={id}
      id={id}
      cursor={cursor}
      userInfo={userInfo}
      currentUser={currentUser}
    />
  ))
}
