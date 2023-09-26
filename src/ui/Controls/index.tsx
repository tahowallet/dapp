import React from "react"
import ZoomControls from "./ZoomControls"
import MapControl from "./MapControl"

export default function Controls() {
  return (
    <>
      <div className="controls column_center">
        <ZoomControls />
        <MapControl />
      </div>
      <style jsx>
        {`
          .controls {
            position: absolute;
            left: 35px;
            bottom: 72px;
            z-index: var(--z-controls);
            gap: 5px;
          }
        `}
      </style>
    </>
  )
}
