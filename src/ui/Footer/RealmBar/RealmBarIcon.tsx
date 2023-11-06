import React, { useEffect, useState } from "react"
import Icon from "shared/components/Icon"
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

  const [props] = useSpring(
    () => ({
      from: { left: `${prevPosition}px` },
      to: { left: `${displayedPosition}px` },
      config: { duration: 1000, easing: easings.easeOutCubic },
    }),
    [prevPosition, displayedPosition]
  )

  if (!currentRealm) return null

  return (
    <animated.div
      className="icon"
      style={{
        ...props,
        height: 24,
        width: 24,
        padding: 3,
        background: currentRealm.partnerColor ?? currentRealm.color,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        borderRadius: "50%",
        zIndex: 999,
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

  // return (
  //   <>
  //     <div
  //       className="icon center"
  //       onMouseEnter={() => setIsTooltipVisible(true)}
  //       onMouseLeave={() => setIsTooltipVisible(false)}
  //     >
  //       <Icon
  //         src={currentRealm.partnerIcons.default}
  //         type="image"
  //         height="100%"
  //         width="100%"
  //       />
  //       <RealmBarTooltip
  //         name={name}
  //         population={population}
  //         isVisible={isTooltipVisible}
  //       />
  //     </div>
  //     <style jsx>{`
  //       .icon {
  //         height: 24px;
  //         width: 24px;
  //         padding: 3px;
  //         background: ${currentRealm.partnerColor ?? currentRealm.color};
  //         position: absolute;
  //         top: 50%;
  //         transform: translateY(-50%);
  //         left: ${position}px;
  //         border-radius: 50%;
  //         z-index: 999;
  //       }
  //     `}</style>
  //   </>
  // )
}
