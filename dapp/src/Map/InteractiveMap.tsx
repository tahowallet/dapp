import React, { useCallback, useRef, useState } from "react"
import { Layer, Rect, Stage } from "react-konva"
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
import { KonvaNode, KonvaStage, Vector2d } from "./types"

export default function InteractiveMap() {
  const settingsRef = useRef({ minScale: 0 })
  const [zoomLevel, setZoomLevel] = useState(1)
  const [stageBounds, setStageDimensions] = useState(() =>
    getWindowDimensions()
  )
  const mapRef = useRef<KonvaStage | null>(null)

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

  const stageFns = useValueRef({ centerMap, resetZoom })

  useBeforeFirstPaint(() => {
    const node = mapRef.current
    if (!node) return () => {}

    const container = node.container()

    let acc = 0
    let skipUpdate = false
    const handler = (evtg: WheelEvent) => {
      const zoom = node.scaleX()

      acc += evtg.deltaY

      if (!skipUpdate) {
        requestAnimationFrame(() => {
          const zoomFactor = 0.001
          const newScale = limitToBounds(
            zoom + acc * -zoomFactor,
            settingsRef.current.minScale,
            0.35
          )
          setZoomLevel(newScale)
          acc = 0
          skipUpdate = false
        })
      }

      skipUpdate = true
    }

    container.addEventListener("wheel", handler, { passive: false })
    return () => container.removeEventListener("wheel", handler)
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
    const node = this
    const scale = node.scaleX()
    const width = node.width()
    const height = node.height()

    const maxX = MAP_BOX.width - width / scale
    const maxY = MAP_BOX.height - height / scale

    const finalX = limitToBounds(position.x, -maxX * scale, 0)
    const finalY = limitToBounds(position.y, -maxY * scale, 0)

    return { x: finalX, y: finalY }
  },
  [])

  return (
    <div className="map_container">
      <style jsx>
        {`
          .map_container {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
        `}
      </style>
      <Stage
        ref={mapRef}
        draggable
        dragBoundFunc={restrictDragBounds}
        scale={{ x: zoomLevel, y: zoomLevel }}
        width={stageBounds.width}
        height={stageBounds.height}
      >
        <Layer listening={false}>
          <Background />
        </Layer>
        <Layer>
          <Rect width={MAP_BOX.width} height={MAP_BOX.height} fill="#0003" />
        </Layer>
        <Layer>
          <Zones />
        </Layer>
      </Stage>
    </div>
  )
}
