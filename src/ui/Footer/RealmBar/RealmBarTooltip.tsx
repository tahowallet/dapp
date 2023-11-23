import React from "react"
import { animated } from "@react-spring/web"
import { separateThousandsByComma } from "shared/utils"
import { useVisibilityTransition } from "shared/hooks"

type RealmBarTooltipProps = {
  name: string
  population: number
  isVisible: boolean
}

export default function RealmBarTooltip({
  name,
  population,
  isVisible,
}: RealmBarTooltipProps) {
  const transition = useVisibilityTransition(isVisible)

  return (
    <>
      <animated.div
        className="column_center"
        style={{
          ...transition,
          position: "absolute",
          bottom: "calc(100% + 10px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "var(--primary-p1-80)",
          textAlign: "center",
          padding: "4px 16px 0",
          borderRadius: 4,
          pointerEvents: "none",
        }}
      >
        <div className="tooltip">
          <p className="tooltip_name">{name}</p>
          <p className="tooltip_population">
            {separateThousandsByComma(population, 0)}
          </p>
        </div>
      </animated.div>
      <style jsx>{`
        .tooltip_name {
          font-size: 16px;
          line-height: 24px;
          color: var(--secondary-s1-70);
          white-space: nowrap;
        }
        .tooltip_population {
          font-size: 22px;
          line-height: 32px;
          font-weight: 600;
        }
        .tooltip::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 16px 10px 0 10px;
          border-color: var(--primary-p1-80) transparent transparent transparent;
        }
      `}</style>
    </>
  )
}
