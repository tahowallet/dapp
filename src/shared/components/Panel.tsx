import React from "react"
import classNames from "classnames"
import Portal from "./Portal"

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel_section">
      {children}
      <style jsx>{`
        .panel_section {
          padding: 32px;
          background: var(--primary-p1-100);
        }
      `}</style>
    </div>
  )
}

function Container({
  children,
  position = "left",
}: {
  children: React.ReactNode
  position?: "left" | "right"
}) {
  return (
    <Portal>
      <div className="panel_container no_scrollbar">
        <div
          className={classNames("panel column", {
            [position]: true,
          })}
        >
          {children}
        </div>
      </div>
      <style jsx>{`
        .panel_container {
          overflow: visible auto;
          position: absolute;
          top: 0;
          ${position}: 0;
          padding: 180px 0;
          height: 100vh;
          max-width: 480px;
        }
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
