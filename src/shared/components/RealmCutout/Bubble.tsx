import { animated, easings, useSpring } from "@react-spring/web"
import React, { useEffect, useState } from "react"
import { getRealmPopulationIcon } from "shared/constants"
import { usePopulationBubble } from "shared/hooks"

export const STYLE = {
  default: { opacity: 0, transform: "translateY(150px)" },
  highlight: { opacity: 1, transform: "translateY(50px)" },
}

export const BUBBLE_CONFIG = {
  precision: 0.1,
  duration: 2000,
  easing: easings.easeOutCubic,
}

export default function Bubble({ realmId }: { realmId: string }) {
  const { showBubble, setShowBubble } = usePopulationBubble(realmId)

  const [iconSrc, setIconSrc] = useState<string | null>(null)

  useEffect(() => {
    const icon = getRealmPopulationIcon(realmId)
    setIconSrc(icon)
  }, [realmId])

  const [bubbleProps] = useSpring(
    () => ({
      from: STYLE.default,
      to: showBubble ? STYLE.highlight : STYLE.default,
      config: BUBBLE_CONFIG,
      onRest: () => setShowBubble(false),
    }),
    [showBubble]
  )

  if (!iconSrc) return null

  return (
    <animated.div
      style={{ ...bubbleProps, left: "220px", position: "absolute", zIndex: 2 }}
    >
      <div>
        <img src={iconSrc} height={24} width={24} alt="Bubble" />
      </div>
    </animated.div>
  )
}
