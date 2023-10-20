import React from "react"
import Portal from "./Portal"

export default function Version() {
  return (
    <>
      <Portal>
        <p className="version">
          {process.env.VERSION}
          {process.env.COMMIT_HASH}
        </p>
      </Portal>
      <style jsx>{`
        .version {
          color: #0b3a37;
          font-size: 12px;
          right: 27px;
          bottom: 4px;
          position: absolute;
          z-index: var(--z-assistant-icon);
        }
      `}</style>
    </>
  )
}
