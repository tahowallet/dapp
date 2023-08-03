import React, { useCallback, useRef, useState } from "react"
import { Layer, Stage } from "react-konva"
import rafSchd from "raf-schd"

import Background from "./Background"
import Zones from "./MapZones"
import { MAP_BOX } from "./constants"
import {
  getWindowDimensions,
  getMinimumScale,
  limitToBounds,
  useBeforeFirstPaint,
  useOnResize,
  useValueRef,
} from "./utils"
import { KonvaNode, KonvaStage, KonvaEventListener, Vector2d } from "./types"

function TestControls({
  setOverlay,
}: {
  setOverlay: (overlay: "dark" | "subtle" | "none") => void
}) {
  return (
    <div className="column">
      <style jsx>{`
        div {
          position: absolute;
          top: 50%;
          z-index: 2;
        }
      `}</style>
      <button type="button" onClick={() => setOverlay("dark")}>
        Set dark overlay
      </button>
      <button type="button" onClick={() => setOverlay("subtle")}>
        Set subtle overlay
      </button>
      <button type="button" onClick={() => setOverlay("none")}>
        Turn off overlay
      </button>
    </div>
  )
}

export default function InteractiveMap() {
  const settingsRef = useRef({ minScale: 0 })
  const [zoomLevel, setZoomLevel] = useState(1)
  const [stageBounds, setStageDimensions] = useState(() =>
    getWindowDimensions()
  )
  const mapRef = useRef<KonvaStage | null>(null)

  const [overlay, setOverlay] = useState<"dark" | "subtle" | "none">("subtle")

  const stageFns = useValueRef(() => {
    const resetZoom = () => {
      const box = {
        width: stageBounds.width,
        height: stageBounds.height,
      }

      const minZoom = getMinimumScale(MAP_BOX, box)
      settingsRef.current.minScale = minZoom

      setZoomLevel(minZoom)
      stageFns.current.centerMap(minZoom)
    }

    const centerMap = (scale: number) => {
      const mapNode = mapRef.current
      if (mapNode) {
        mapNode.absolutePosition({
          x: -Math.abs((MAP_BOX.width * scale - stageBounds.width) / 2),
          y: -Math.abs((MAP_BOX.height * scale - stageBounds.height) / 2),
        })
      }
    }

    return { centerMap, resetZoom }
  })

  useBeforeFirstPaint(() => {
    const stage = mapRef.current
    if (!stage) return () => {}

    let acc = 0

    const handleZoom = rafSchd((delta: number) => {
      const zoom = stage.scaleX()
      const zoomFactor = 0.001
      const { minScale } = settingsRef.current

      const newScale = limitToBounds(
        zoom + delta * -zoomFactor,
        minScale,
        Math.max(0.45, minScale)
      )

      const stagePos = stage.absolutePosition()
      const pointer = stage.getPointerPosition()

      if (pointer && newScale !== zoom) {
        // Get current mouse position in the canvas
        const pointerCanvasPos = {
          x: -(pointer.x - stagePos.x) / zoom,
          y: -(pointer.y - stagePos.y) / zoom,
        }

        const maxX = MAP_BOX.width - stage.width() / newScale
        const maxY = MAP_BOX.height - stage.height() / newScale

        // Add back pointer position to retrieve "same canvas position" offset
        const targetX = pointerCanvasPos.x * newScale + pointer.x
        const targetY = pointerCanvasPos.y * newScale + pointer.y

        stage.scale({ x: newScale, y: newScale })

        // Force bounds while zooming in/out
        stage.absolutePosition({
          x: limitToBounds(targetX, -maxX * newScale, 0),
          y: limitToBounds(targetY, -maxY * newScale, 0),
        })

        // Manually update the stage scale and queue a state update
        setZoomLevel(newScale)
      }
      acc = 0
    })

    const handler: KonvaEventListener<KonvaStage, WheelEvent> = ({
      evt: domEvent,
    }) => {
      domEvent.preventDefault()
      acc += domEvent.deltaY
      handleZoom(acc)
    }

    stage.on("wheel", handler)
    return () => stage.off("wheel", handler)
  })

  useOnResize(() => {
    const windowSize = getWindowDimensions()

    setStageDimensions(windowSize)

    // re-center & reset map zoom on resize
    requestAnimationFrame(() => stageFns.current.resetZoom())
  })

  // Set initial zoom
  useBeforeFirstPaint(() => stageFns.current.resetZoom())

  const restrictDragBounds = useCallback(function restrictDragging(
    this: KonvaNode,
    position: Vector2d
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const stage = this
    const scale = stage.scaleX()
    const width = stage.width()
    const height = stage.height()

    const maxX = MAP_BOX.width - width / scale
    const maxY = MAP_BOX.height - height / scale

    const finalX = limitToBounds(position.x, -maxX * scale, 0)
    const finalY = limitToBounds(position.y, -maxY * scale, 0)

    return { x: finalX, y: finalY }
  },
  [])

  return (
    <>
      <TestControls setOverlay={setOverlay} />
      <Stage
        ref={mapRef}
        draggable
        dragBoundFunc={restrictDragBounds}
        scale={{ x: zoomLevel, y: zoomLevel }}
        width={stageBounds.width}
        height={stageBounds.height}
      >
        <Layer>
          <Background overlay={overlay} />
          <Zones />
        </Layer>
      </Stage>
    </>
  )
}
