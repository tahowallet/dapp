import React from "react"
import { useReflectCursorPosition, useReflectUserInfo } from "shared/hooks"
import { ReflectInstance } from "shared/services"

export default function IslandCursor({
  reflect,
}: {
  reflect: ReflectInstance
}) {
  const cursorPosition = useReflectCursorPosition(reflect)
  const userInfo = useReflectUserInfo(reflect)

  if (!cursorPosition || !userInfo) return null

  const { name, stakingRealm, stakingRealmColor } = userInfo

  return (
    <>
      <div className="cursor_container">
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
          left: ${cursorPosition.x + 10}px;
          top: ${cursorPosition.y + 14}px;
          border-radius: 4px;
          cursor: none;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}
