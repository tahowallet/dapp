import React from "react"
import * as zones from "./zones-data"
import { MAP_BOX } from "./constants"
import backgroundImg from "../public/dapp_map_bg.webp"

export function MapZoneCutout({ zoneId }: { zoneId: string }) {
  const pathData = zones.default.find((z) => z.id.toString() === zoneId)
  if (!pathData) {
    return null
  }

  return (
    <svg
      height={200}
      viewBox={`0 0 ${Math.ceil(pathData.w * 0.25)} ${Math.ceil(
        pathData.h * 0.25
      )}`}
      preserveAspectRatio="xMinYMin slice"
      style={{
        filter:
          "drop-shadow(0px 2px 4px rgba(7, 17, 17, 0.34)) drop-shadow(0px 6px 8px rgba(7, 17, 17, 0.24)) drop-shadow(0px 16px 16px rgba(7, 17, 17, 0.30))",
      }}
    >
      <defs>
        <path
          id="cutout_path"
          d={pathData.path}
          width={pathData.w}
          height={pathData.h}
        />
        <mask id="cutout">
          <use
            href="#cutout_path"
            fill="#fff"
            transform={`translate(${pathData.x}, ${pathData.y})`}
          />
        </mask>
      </defs>
      <image
        transform={`scale(0.25) translate(-${pathData.x}, -${pathData.y})`}
        width={MAP_BOX.width}
        height={MAP_BOX.height}
        href={backgroundImg}
        mask="url(#cutout)"
      />
      <use
        href="#cutout_path"
        transform="scale(0.25)"
        fill="transparent"
        stroke="white"
        strokeWidth="6"
      />
    </svg>
  )
}

export function MapZoneBackgroundCutout({ zoneId }: { zoneId: string }) {
  const pathData = zones.default.find((z) => z.id.toString() === zoneId)
  if (!pathData) {
    return null
  }

  return (
    <svg height={200} width="100%">
      <defs>
        <radialGradient
          id="zone_watermark"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(489 -9.90245) rotate(100.421) scale(154.803 585.77)"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
        </radialGradient>
        <mask id="zone_background_mask">
          <rect width="100%" height="100%" fill="url(#zone_watermark)" />
        </mask>
      </defs>
      <g mask="url(#zone_background_mask)" style={{ maskMode: "alpha" }}>
        <image
          transform={`scale(0.25) translate(-${pathData.x}, -${pathData.y})`}
          width={MAP_BOX.width}
          height={MAP_BOX.height}
          href={backgroundImg}
        />
      </g>
    </svg>
  )
}
