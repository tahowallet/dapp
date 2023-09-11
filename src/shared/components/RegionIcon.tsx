import classNames from "classnames"
import React from "react"
import { getRegionData } from "shared/constants"

type RegionIconProps = {
  regionId: string
  color: string
  type?: "fill" | "circle"
  width?: string
}

export default function RegionIcon({
  regionId,
  color,
  type = "fill",
  width = "16px",
}: RegionIconProps) {
  const region = getRegionData(regionId)

  return (
    <div
      className={classNames({
        circle: type === "circle",
      })}
    >
      <div
        className={classNames({
          fill: type === "fill",
        })}
      >
        <svg viewBox={`0 0 ${region.w} ${region.h}`}>
          <path d={region.paths[0].data} fill={color} />
        </svg>
      </div>
      <style jsx>{`
        .circle {
          background: ${region.color};
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${width};
          height: ${width};
        }

        .circle > div {
          width: 50%;
        }

        .fill {
          width: ${width};
          height: 100%;
        }
      `}</style>
    </div>
  )
}
