import React, { useState } from "react"
import RealmBarTooltip from "./RealmBarTooltip"

type RealmBarIconProps = {
  name: string
  population: number
  position: number
  index: number
  progressBar: HTMLDivElement | null
}

export default function RealmBarIcon({
  name,
  population,
  position,
  index,
  progressBar,
}: RealmBarIconProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  if (!progressBar) return null

  const { width: progressBarWidth, left: progressBarStart } =
    progressBar.getBoundingClientRect()

  const adjustedProgressBarWidth = progressBarWidth - 16 // some spacing, not to stick to the progress bar
  let adjustedPosition = position * adjustedProgressBarWidth + 8

  const previous = progressBar.children[index - 1]

  if (index > 0 && previous) {
    const previousRightBound = previous.getBoundingClientRect().left + 24

    if (previousRightBound > adjustedPosition + progressBarStart) {
      adjustedPosition = previousRightBound - progressBarStart
    }
  }

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
          left: ${adjustedPosition}px;
          border-radius: 50%;
          z-index: 999;
        }
      `}</style>
    </>
  )
}
