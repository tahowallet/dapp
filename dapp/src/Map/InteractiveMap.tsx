import React, { useLayoutEffect, useRef, useState } from "react"
import type { Stage as KonvaStage } from "konva/lib/Stage"
import { Layer, Rect, Stage } from "react-konva"
import { isBrowser } from "../shared/utils"
import Background from "./Background"
import Zones from "./MapZones"
import { MAP_BOX } from "./constants"
import { getDimensions, limitToBounds, useValueRef } from "./utils"

export default function InteractiveMap() {
  const [zoomLevel, setZoomLevel] = useState(0.2)
  const [windowBounds, setStageDimensions] = useState(() => getDimensions())
  const mapRef = useRef<KonvaStage | null>(null)

  const onZoomOut = () =>
    setZoomLevel((prevScale) => (prevScale > 0.4 ? prevScale - 0.1 : prevScale))

  const onZoomIn = () =>
    setZoomLevel((prevScale) => (prevScale < 0.7 ? prevScale + 0.1 : prevScale))

  const resetZoom = () => {
    const box = {
      width: windowBounds.width,
      height: windowBounds.height,
    }

    const boxAspectRatio = box.width / box.height
    const mapAspectRatio = MAP_BOX.w / MAP_BOX.h

    let zoom = 1

    if (mapAspectRatio > boxAspectRatio) {
      let [small, large] = [MAP_BOX.h, box.height]
      if (small > large) [small, large] = [large, small]
      // map wider than container, use height
      zoom = small / large
    } else {
      let [small, large] = [MAP_BOX.w, box.width]
      if (small > large) [small, large] = [large, small]
      zoom = small / large
    }

    setZoomLevel(zoom)
    stageFns.current.centerMap(zoom)
  }

  const centerMap = (scale: number = zoomLevel) => {
    const KonvaStage = mapRef.current
    if (KonvaStage) {
      KonvaStage.absolutePosition({
        x: -Math.abs((MAP_BOX.w * scale - windowBounds.width) / 2),
        y: -Math.abs((MAP_BOX.h * scale - windowBounds.height) / 2),
      })
    }
  }

  const stageFns = useValueRef({ centerMap, resetZoom })

  useLayoutEffect(() => {
    const handleResize = () => {
      setStageDimensions(getDimensions())
      // re-center & reset map zoom on resize
      queueMicrotask(resetZoom)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Set initial zoom
  useLayoutEffect(() => {
    stageFns.current.resetZoom()
  }, [])

  return (
    <div className="map-container">
      <style>
        {`
        .map-container{
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        `}
      </style>
      <div>
        <button onClick={onZoomOut}>Zoom out</button>
        <button onClick={onZoomIn}>Zoom in</button>
      </div>
      {isBrowser && (
        <Stage
          ref={mapRef}
          draggable
          dragBoundFunc={function (position) {
            const scale = this.scaleX()

            const maxX = MAP_BOX.w - windowBounds.width / scale
            const maxY = MAP_BOX.h - windowBounds.height / scale

            const finalX = limitToBounds(position.x, -maxX * scale, 0)
            const finalY = limitToBounds(position.y, -maxY * scale, 0)

            return { x: finalX, y: finalY }
          }}
          scale={{ x: zoomLevel, y: zoomLevel }}
          width={windowBounds.width}
          height={windowBounds.height}
        >
          <Layer listening={false}>
            <Background />
          </Layer>
          <Layer>
            <Rect width={MAP_BOX.w} height={MAP_BOX.h} fill="#0003" />
          </Layer>
          <Layer>
            <Zones />
          </Layer>
        </Stage>
      )}
    </div>
  )
}
