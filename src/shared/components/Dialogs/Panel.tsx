import React, { ReactNode, CSSProperties } from "react"
import classNames from "classnames"
import { animated } from "@react-spring/web"
import { usePanelRealmClose, useRealmPanelTransition } from "shared/hooks"
import Portal from "../Interface/Portal"

type PortalSectionProps = {
  children: ReactNode
  style?: CSSProperties
}

function Section({ children, style }: PortalSectionProps) {
  return (
    <div className="panel_section" style={style}>
      {children}
      <style jsx>{`
        .panel_section {
          background: var(--primary-p1-100);
          backdrop-filter: blur(26px);
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

type PanelContainerProps = {
  children: ReactNode
  position?: "left" | "right"
  style?: CSSProperties
}

function Container({
  children,
  position = "left",
  style,
}: PanelContainerProps) {
  const containerTransitionStyles = useRealmPanelTransition(position)
  const closePanel = usePanelRealmClose()

  return (
    <Portal>
      <animated.div
        style={{ ...style, ...containerTransitionStyles }}
        className="no_scrollbar"
        onClick={(e) => {
          if (e.target !== e.currentTarget) return
          closePanel()
        }}
      >
        <div
          className={classNames("panel column", {
            [position]: true,
          })}
        >
          {children}
        </div>
      </animated.div>
      <style jsx>{`
        .panel {
          gap: 4px;
        }
      `}</style>
      <style jsx global>
        {`
          .panel.left .panel_section {
            border-radius: 0 4px 4px 0;
          }
          .panel.left .panel_section:first-child {
            border-top-right-radius: 16px;
          }
          .panel.left .panel_section:last-child {
            border-bottom-right-radius: 16px;
          }

          .panel.right .panel_section:first-child {
            border-radius: 4px 0 0 4px;
          }
          .panel.right .panel_section:first-child {
            border-top-left-radius: 16px;
          }
          .panel.right .panel_section:last-child {
            border-bottom-left-radius: 16px;
          }
        `}
      </style>
    </Portal>
  )
}

export default { Container, Section }
