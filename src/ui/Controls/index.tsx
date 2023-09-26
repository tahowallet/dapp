import React from "react"
import ZoomControls from "./ZoomControls"

export default function Controls() {
  return (
    <>
      <div className="controls">
        <ZoomControls />
      </div>
      <style jsx>
        {`
          .controls {
            position: absolute;
            left: 35px;
            bottom: 72px;
            z-index: var(--z-controls);
          }
        `}
      </style>
    </>
  )
}
