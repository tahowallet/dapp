import React from "react"
import { MAP_BOX, getRegionData } from "./constants"
import backgroundImg from "../public/dapp_map_bg.webp"
import { limitToBounds } from "./utils"

export function MapRegionCutout({ regionId }: { regionId: string }) {
  const pathData = getRegionData(regionId)

  const pathCutoutXref = `cutout_${regionId}_path`
  return (
    <svg
      viewBox={`0 0 ${Math.ceil(pathData.w * 0.25)} ${Math.ceil(
        pathData.h * 0.25
      )}`}
      preserveAspectRatio="xMinYMin slice"
      style={{
        ...(pathData.w / pathData.h > 1 ? { width: 200 } : { height: 200 }),
        filter:
          "drop-shadow(0px 2px 4px rgba(7, 17, 17, 0.34)) drop-shadow(0px 6px 8px rgba(7, 17, 17, 0.24)) drop-shadow(0px 16px 16px rgba(7, 17, 17, 0.30))",
      }}
    >
      <defs>
        <path
          id={pathCutoutXref}
          d={pathData.paths[0].data}
          width={pathData.w}
          height={pathData.h}
        />
        <mask id={`cutout_${regionId}`}>
          <use
            href={`#${pathCutoutXref}`}
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
        mask={`url(#cutout_${regionId})`}
      />
      <use
        href={`#${pathCutoutXref}`}
        transform="scale(0.25)"
        fill="transparent"
        stroke={pathData.color}
        strokeWidth="10"
      />
      <use
        href={`#${pathCutoutXref}`}
        transform="scale(0.25)"
        fill={pathData.color}
        opacity={0.7}
        style={{ mixBlendMode: "color" }}
      />
    </svg>
  )
}

export function MapRegionBackgroundCutout({ regionId }: { regionId: string }) {
  const pathData = getRegionData(regionId)

  /**
   * For the x offset we want to push the region to the right side of the modal
   */
  const targetXOffset = limitToBounds(
    pathData.x - pathData.w + 755,
    MAP_BOX.width * 0.2,
    MAP_BOX.width * 0.75 - pathData.w - 755
  )

  /**
   * The y offset is a bit more complicated because we want to center the
   * cutout vertically, but also make sure it doesn't go off the top or bottom
   */
  const targetYOffset = limitToBounds(
    pathData.y + pathData.h * 0.2,
    MAP_BOX.height * 0.2,
    MAP_BOX.height * 0.9
  )
  return (
    <svg height={200} width="100%">
      <defs>
        <radialGradient
          id="region_watermark"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(489 -9.90245) rotate(100.421) scale(154.803 585.77)"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
        </radialGradient>
        <mask id="region_background_mask">
          <rect width="100%" height="100%" fill="url(#region_watermark)" />
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
      <g mask="url(#region_background_mask)" style={{ maskMode: "alpha" }}>
        <image
          transform={`scale(0.25) translate(-${targetXOffset}, -${targetYOffset})`}
          width={MAP_BOX.width}
          height={MAP_BOX.height}
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
