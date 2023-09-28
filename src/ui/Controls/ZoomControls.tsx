import React from "react"
import zoomIn from "shared/assets/icons/m/zoom-in.svg"
import zoomOut from "shared/assets/icons/m/zoom-out.svg"
import { Stage } from "konva/lib/Stage"

import { useDappDispatch, setIslandZoomLevel } from "redux-state"
import {
  calculateIslandPosition,
  calculateNewIslandScale,
  getCurrentCanvasPosition,
} from "shared/utils"
import ZoomControl from "./ZoomControl"

type ZoomControlsProps = {
  stage: Stage
  minScale: number
}

export default function ZoomControls({ stage, minScale }: ZoomControlsProps) {
  const dispatch = useDappDispatch()

  const zoomHandler = (increase: boolean) => {
    const zoom = stage.scaleX()
    const scaleBy = 1.05

    const center = {
      x: stage.width() / 2,
      y: stage.height() / 2,
    }

    // Get current center related to screen
    const canvasPosition = getCurrentCanvasPosition(
      center.x - stage.x(),
      center.y - stage.y(),
      zoom
    )

    const newScale = calculateNewIslandScale(
      increase ? zoom * scaleBy : zoom / scaleBy,
      minScale
    )

    const newPosition = {
      x: center.x - canvasPosition.x * newScale,
      y: center.y - canvasPosition.y * newScale,
    }

    // Force bounds while zooming in/out
    stage.absolutePosition(
      calculateIslandPosition(stage, newScale, newPosition.x, newPosition.y)
    )

    // Update the stage scale
    dispatch(setIslandZoomLevel(newScale))
  }

  return (
    <>
      <div className="controls column_center">
        <ZoomControl icon={zoomIn} onClick={() => zoomHandler(true)} />
        <ZoomControl icon={zoomOut} onClick={() => zoomHandler(false)} />
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
