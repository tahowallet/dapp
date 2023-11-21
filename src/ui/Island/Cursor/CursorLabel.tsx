import React from "react"
import Icon from "shared/components/Icon"
import { ReflectCursor, ReflectUserInfo } from "shared/types"

export type CursorLabelProps = {
  cursor: ReflectCursor | null
  userInfo: ReflectUserInfo
  extraCursor: boolean
}

export default function CursorLabel({
  cursor,
  userInfo,
  extraCursor,
}: CursorLabelProps) {
  if (!cursor) return null

  const { name, realmIcon, stakingRealmColor, cursorTextColor } = userInfo

  return (
    <>
      <div
        className="row_center cursor_container"
        style={{
          left: cursor.x + (extraCursor ? 20 : 12),
          top: cursor.y + (extraCursor ? 15 : 12),
        }}
      >
        <div
          className="elipsis"
          style={{ whiteSpace: "nowrap", fontSize: "16px" }}
        >
          {name}
        </div>
        {realmIcon && (
          <Icon src={realmIcon} type="image" height="16px" width="16px" />
        )}
      </div>
      <style jsx>{`
        .cursor_container {
          background: ${stakingRealmColor};
          color: ${cursorTextColor};
          font-size: 14px !important;
          padding: 6px;
          gap: 6px;
          position: absolute;
          border-radius: 4px;
          cursor: none;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}
