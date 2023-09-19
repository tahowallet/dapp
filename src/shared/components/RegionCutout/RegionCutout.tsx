import React from "react"
import { MAP_BOX, getRegionData } from "shared/constants"
import backgroundImg from "public/dapp_map_bg.webp"
import { selectDisplayedRegionId, useDappSelector } from "redux-state"
import RegionPin from "./RegionPin"

export default function RegionCutout() {
  const regionId = useDappSelector(selectDisplayedRegionId)

  if (!regionId) return null

  const pathData = getRegionData(regionId)

  const pathCutoutXref = `cutout_${regionId}_path`
  return (
    <div style={{ position: "relative" }}>
      <RegionPin />
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
    </div>
  )
}
