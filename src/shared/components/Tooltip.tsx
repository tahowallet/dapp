import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import infoIcon from "shared/assets/icons/m/info.svg"
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
  const tooltipRef = useRef<HTMLDivElement>(null)

  const toggleTooltip = () => setIsTooltipVisible((prev) => !prev)

  useEffect(() => {
    if (!tooltipRef.current) return
    const tooltip = tooltipRef.current

    tooltip.addEventListener("mouseenter", toggleTooltip)
    tooltip.addEventListener("mouseleave", toggleTooltip)

    // eslint-disable-next-line consistent-return
    return () => {
      tooltip.removeEventListener("mouseenter", toggleTooltip)
      tooltip.removeEventListener("mouseleave", toggleTooltip)
    }
  }, [tooltipRef])

  return (
    <>
      <div className="label row" style={style}>
        <div style={labelStyle}>{label}</div>
        <div style={{ position: "relative" }} ref={tooltipRef}>
          <Icon
            color="var(--secondary-s1-80)"
            src={infoIcon}
            style={{ zIndex: "3", position: "relative" }}
          />
          {isTooltipVisible && (
            <div className="tooltip">
              <div className="tooltip_content">{children}</div>
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .label {
            gap: 8px;
            align-items: center;
          }
          .tooltip {
            position: absolute;
            left: 0;
            top: 0;
            padding-top: 32px;
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
