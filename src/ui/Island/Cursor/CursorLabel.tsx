import React from "react"
import Icon from "shared/components/Icon"
import { ReflectCursor, ReflectUserInfo } from "shared/types"

export type CursorLabelProps = {
  cursor: ReflectCursor
  userInfo: ReflectUserInfo
  extraCursor: boolean
}

export default function CursorLabel({
  cursor,
  userInfo,
  extraCursor,
}: CursorLabelProps) {
  if (!cursor) return null

  const { name, avatar, stakingRealmColor } = userInfo

  return (
    <>
      <div
        className="row_center cursor_container"
        style={{
          left: cursor.x + (extraCursor ? 20 : 12),
          top: cursor.y + (extraCursor ? 15 : 12),
        }}
      >
        <div className="elipsis" style={{ whiteSpace: "nowrap" }}>
          {name}
        </div>
        {avatar && (
          <Icon src={avatar} type="image" height="16px" width="16px" />
        )}
      </div>
      <style jsx>{`
        .cursor_container {
          background: ${stakingRealmColor ?? "var(--secondary-s1-100)"};
          color: ${avatar
            ? "var(--secondary-s1-100)"
            : "var(--primary-p1-100)"};
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
