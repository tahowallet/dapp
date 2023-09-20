import React from "react"
import { MAP_BOX, getRegionData } from "shared/constants"
import backgroundImg from "public/dapp_map_bg.webp"
import { selectDisplayedRegionId, useDappSelector } from "redux-state"
import RegionPin from "./RegionPin"

export default function RegionCutout() {
  const regionId = useDappSelector(selectDisplayedRegionId)

  if (!regionId) return null

  const pathData = getRegionData(regionId)

  const CUTOUT_HEIGHT = 208
  const CUTOUT_WIDTH = 356
  const CUTOUT_RATIO = CUTOUT_HEIGHT / CUTOUT_WIDTH
  const PATHDATA_RATIO = pathData.h / pathData.w

  const pathCutoutXref = `cutout_${regionId}_path`
  return (
    <>
      <div className="region_cutout">
        <RegionPin />
        <svg
          viewBox={`0 0 ${Math.ceil(pathData.w * 0.25)} ${Math.ceil(
            pathData.h * 0.25
          )}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            ...(PATHDATA_RATIO / CUTOUT_RATIO < 1
              ? { width: 356 }
              : { height: 208 }),
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
      <style jsx>
        {`
          .region_cutout {
            position: relative;
            width: ${CUTOUT_WIDTH}px;
            height: ${CUTOUT_HEIGHT}px;
            display: flex;
            justify-content: flex-end;
          }
        `}
      </style>
    </>
  )
}
