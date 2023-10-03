import React, { useState } from "react"
import RealmBarTooltip from "./RealmBarTooltip"

type RealmBarIconProps = {
  name: string
  population: number
  position: number
}

export default function RealmBarIcon({
  name,
  population,
  position,
}: RealmBarIconProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  return (
    <>
      <div
        className="icon"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <RealmBarTooltip
          name={name}
          population={population}
          isVisible={isTooltipVisible}
        />
      </div>
      <style jsx>{`
        .icon {
          height: 24px;
          width: 24px;
          background: blue;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: ${position}px;
          border-radius: 50%;
          z-index: 999;
        }
      `}</style>
    </>
  )
}
