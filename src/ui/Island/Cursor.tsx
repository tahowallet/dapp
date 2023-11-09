import React from "react"
import Icon from "shared/components/Icon"
import {
  useReflectCursorPosition,
  useReflectUserInfo,
} from "shared/hooks/reflect"
import { ReflectInstance } from "shared/services"

export default function IslandCursor({
  reflect,
}: {
  reflect: ReflectInstance
}) {
  const cursorPosition = useReflectCursorPosition(reflect)
  const userInfo = useReflectUserInfo(reflect)

  if (!cursorPosition || !userInfo) return null

  const { name, avatar } = userInfo

  return (
    <>
      <div className="cursor_container row_center">
        {avatar && (
          <Icon src={avatar} height="12px" width="12px" type="image" />
        )}
        <span>{name}</span>
      </div>
      <style jsx>{`
        .cursor_container {
          background: #000;
          gap: 8px;
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
