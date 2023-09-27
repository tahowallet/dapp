import React, { CSSProperties, ReactNode, useState } from "react"
import infoIcon from "shared/assets/icons/m/info.svg"
import { animated, useSpring } from "@react-spring/web"
import Icon from "./Icon"

type TooltipProps = {
  label: ReactNode
  children: ReactNode
  style?: CSSProperties
  labelStyle?: CSSProperties
}

export default function Tooltip({
  label,
  children,
  style,
  labelStyle,
}: TooltipProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const tooltipAnimation = useSpring({
    opacity: isTooltipVisible ? 1 : 0,
    left: 0,
    top: 0,
    paddingTop: 32,
  })

  return (
    <>
      <div className="label row" style={style}>
        <div style={labelStyle}>{label}</div>
        <div
          style={{ position: "relative" }}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
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
              }}
            />
          </div>
          <animated.div style={{ ...tooltipAnimation, position: "absolute" }}>
            <div className="tooltip">{children}</div>
          </animated.div>
        </div>
      </div>
      <style jsx>
        {`
          .label {
            gap: 8px;
            align-items: center;
          }
          .tooltip {
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
