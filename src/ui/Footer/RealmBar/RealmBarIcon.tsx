import React, { useEffect, useState } from "react"
import Icon from "shared/components/Media/Icon"
import { getRealmMapData } from "shared/constants"
import { animated, easings, useSpring } from "@react-spring/web"
import RealmBarTooltip from "./RealmBarTooltip"

type RealmBarIconProps = {
  id: string
  name: string
  population: number
  position: number
}

export default function RealmBarIcon({
  id,
  name,
  population,
  position,
}: RealmBarIconProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const currentRealm = getRealmMapData(id)
  const [displayedPosition, setDisplayedPosition] = useState(position)
  const [prevPosition, setPrevPosition] = useState<number | null>(null)

  useEffect(() => {
    setPrevPosition(displayedPosition)
    setDisplayedPosition(position)
  }, [displayedPosition, position])

  const [props] = useSpring(() => {
    if (Number.isNaN(prevPosition) || Number.isNaN(displayedPosition)) return {}

    return {
      from: { left: prevPosition ?? 0 },
      to: { left: displayedPosition ?? 0 },
      config: { duration: 2000, easing: easings.easeOutCubic },
    }
  }, [prevPosition, displayedPosition])

  if (!currentRealm) return null

  return (
    <animated.div
      className="icon"
      style={{
        height: 24,
        width: 24,
        padding: 3,
        background: currentRealm.partnerColor ?? currentRealm.color,
        position: "absolute",
        top: "50%",
        left: displayedPosition ?? 0,
        transform: "translateY(-50%)",
        borderRadius: "50%",
        zIndex: 999,
        ...props,
      }}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <Icon
        src={currentRealm.partnerIcons.default}
        type="image"
        height="100%"
        width="100%"
      />
      <RealmBarTooltip
        name={name}
        population={population}
        isVisible={isTooltipVisible}
      />
    </animated.div>
  )
}
