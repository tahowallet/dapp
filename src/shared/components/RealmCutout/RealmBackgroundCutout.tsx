import React from "react"
import backgroundImg from "public/dapp_island_bg.webp"
import { limitToBounds } from "shared/utils"
import { ISLAND_BOX, getRealmMapData } from "shared/constants"
import { selectDisplayedRealmId, useDappSelector } from "redux-state"

export default function RealmBackgroundCutout() {
  const realmId = useDappSelector(selectDisplayedRealmId)

  if (!realmId) return null

  const pathData = getRealmMapData(realmId)

  /**
   * For the x offset we want to push the realm to the right side of the modal
   */
  const targetXOffset = limitToBounds(
    pathData.x - pathData.w + 755,
    ISLAND_BOX.width * 0.2,
    ISLAND_BOX.width * 0.75 - pathData.w - 755
  )

  /**
   * The y offset is a bit more complicated because we want to center the
   * cutout vertically, but also make sure it doesn't go off the top or bottom
   */
  const targetYOffset = limitToBounds(
    pathData.y + pathData.h * 0.2,
    ISLAND_BOX.height * 0.2,
    ISLAND_BOX.height * 0.9
  )
  return (
    <svg height={200} width="100%">
      <defs>
        <radialGradient
          id="realm_watermark"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(489 -9.90245) rotate(100.421) scale(154.803 585.77)"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
        </radialGradient>
        <mask id="realm_background_mask">
          <rect width="100%" height="100%" fill="url(#realm_watermark)" />
        </mask>
      </defs>
      <defs>
        <radialGradient
          id="radial_overlay"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-228.50083 132.84654 -502.688 -864.64143 689.5 9.5)"
        >
          <stop stopColor={pathData.color} stopOpacity={0.38} />
          <stop offset={1} stopColor={pathData.color} stopOpacity={0.42} />
        </radialGradient>
      </defs>
      <g mask="url(#realm_background_mask)" style={{ maskMode: "alpha" }}>
        <image
          transform={`scale(0.25) translate(-${targetXOffset}, -${targetYOffset})`}
          width={ISLAND_BOX.width}
          height={ISLAND_BOX.height}
          href={backgroundImg}
        />
        <path
          d="M0 16C0 7.163 7.163 0 16 0h723c8.837 0 16 7.163 16 16v187H0V16z"
          fill="url(#radial_overlay)"
        />
      </g>
    </svg>
  )
}
