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
          color: var(--secondary-s1-40);
          font-size: 12px;
          right: 24px;
          bottom: 4px;
          position: absolute;
          z-index: var(--z-assistant-icon);
        }
      `}</style>
    </>
  )
}
