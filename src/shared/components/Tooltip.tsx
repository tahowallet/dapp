import React, { CSSProperties, ReactNode, useState } from "react"
import infoIcon from "shared/assets/icons/m/info.svg"
import { animated, useSpring } from "@react-spring/web"
import Icon from "./Icon"

type TooltipProps = {
  positionY?: "bottom" | "top"
  positionX?: "left" | "right"
  children: ReactNode
  style?: CSSProperties
}

export default function Tooltip({
  positionY = "bottom",
  positionX = "right",
  children,
  style,
}: TooltipProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const tooltipAnimation = useSpring({ opacity: isTooltipVisible ? 1 : 0 })

  const tooltipPosition = {
    ...(positionY === "top"
      ? { bottom: 0, paddingBottom: 32 }
      : { top: 0, paddingTop: 32 }),
    ...(positionX === "left" ? { right: 0 } : { left: 0 }),
  }

  return (
    <>
      <div className="tooltip" onMouseLeave={() => setIsTooltipVisible(false)}>
        <div onMouseEnter={() => setIsTooltipVisible(true)}>
          <Icon
            color={
              isTooltipVisible
                ? "var(--secondary-s1-100)"
                : "var(--secondary-s1-80)"
            }
            src={infoIcon}
            style={{
              zIndex: "3",
              position: "relative",
              transition: "all .2s",
              cursor: "pointer",
            }}
          />
        </div>
        <animated.div
          style={{
            ...tooltipAnimation,
            ...tooltipPosition,
            position: "absolute",
            pointerEvents: isTooltipVisible ? "all" : "none",
          }}
        >
          <div className="tooltip_content" style={style}>
            {children}
          </div>
        </animated.div>
      </div>
      <style jsx>
        {`
          .tooltip {
            position: relative;
            margin-left: 8px;
          }
          .tooltip_content {
            width: 325px;
            padding: 24px 32px 32px;
            background: var(--secondary-s1-90);
            color: var(--primary-p1-100);
            border-radius: 16px;
          }
        `}
      </style>
    </>
  )
}
