import React from "react"
import Icon from "shared/components/Icon"
import { ReflectCursor, ReflectUserInfo } from "shared/types"
import arbitrum from "shared/assets/partners/arbitrum.svg"
import cyberconnect from "shared/assets/partners/cyberconnect.svg"
import gitcoin from "shared/assets/partners/gitcoin.svg"
import galxe from "shared/assets/partners/galxe.svg"
import frax from "shared/assets/partners/frax.svg"

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

  const realmIcons = { arbitrum, cyberconnect, gitcoin, galxe, frax }
  const realmIcon = Object.entries(realmIcons).find(
    ([key]) => key === realmName?.toLowerCase()
  )

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
          <Icon src={realmIcon[1]} type="image" height="16px" width="16px" />
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
