import React from "react"
import zoomIn from "shared/assets/icons/m/zoom-in.svg"
import zoomOut from "shared/assets/icons/m/zoom-out.svg"
import ZoomControl from "./ZoomControl"

export default function ZoomControls() {
  return (
    <>
      <div className="controls column_center">
        <ZoomControl icon={zoomIn} />
        <ZoomControl icon={zoomOut} />
      </div>
      <style jsx>{`
        .controls {
          gap: 7px;
          border-radius: 4px;
          position: relative;
          border: 1px solid var(--secondary-s1-50);
          background: var(--secondary-s1-20);
        }
        .controls::after {
          content: "";
          width: 18px;
          height: 2px;
          background: var(--secondary-s1-50);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .controls:hover {
          border: 1px solid var(--secondary-s1-70);
        }
      `}</style>
    </>
  )
}
