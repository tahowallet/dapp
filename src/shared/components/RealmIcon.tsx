import classNames from "classnames"
import React from "react"
import { getRealmMapData } from "shared/constants"

type RealmIconProps = {
  realmId: string
  color: string
  type?: "fill" | "circle"
  width?: string
}

export default function RealmIcon({
  realmId,
  color,
  type = "fill",
  width = "16px",
}: RealmIconProps) {
  const realm = getRealmMapData(realmId)

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
        <svg viewBox={`0 0 ${realm.w} ${realm.h}`}>
          <path d={realm.paths[0].data} fill={color} />
        </svg>
      </div>
      <style jsx>{`
        .circle {
          background: ${realm.color};
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

        .circle > div,
        .fill {
          display: grid;
          place-items: center;
        }

        .fill {
          width: ${width};
          height: 100%;
        }
      `}</style>
    </div>
  )
}
