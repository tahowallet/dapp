import React from "react"
import { Stage } from "konva/lib/Stage"
import ZoomControls from "./ZoomControls"
import IslandControl from "./IslandControl"

type ControlsProps = {
  stage: Stage | null
  minScale: number
}

export default function Controls({ stage, minScale }: ControlsProps) {
  if (!stage || !minScale) return null

  return (
    <>
      <div className="controls column_center">
        <ZoomControls stage={stage} minScale={minScale} />
        <IslandControl />
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
