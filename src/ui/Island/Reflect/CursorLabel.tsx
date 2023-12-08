import React from "react"
import Icon from "shared/components/Media/Icon"
import { ReflectCursor, ReflectUserInfo } from "shared/types"
import { REALM_ICONS } from "shared/constants"

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

  const { name, realmName, stakingRealmColor, cursorTextColor } = userInfo
  const iconKey = realmName?.toLowerCase() as keyof typeof REALM_ICONS
  const iconSrc = REALM_ICONS[iconKey]

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
          className="ellipsis"
          style={{ whiteSpace: "nowrap", fontSize: "16px", maxWidth: "250px" }}
        >
          {name}
        </div>
        {realmName && iconSrc && (
          <Icon src={iconSrc} type="image" height="16px" width="16px" />
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
