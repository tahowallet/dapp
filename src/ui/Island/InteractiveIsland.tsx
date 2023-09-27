import React, { useCallback, useRef, useState } from "react"
import { Layer, Stage } from "react-konva"
import type Konva from "konva"
import rafSchd from "raf-schd"
import {
  setIslandZoomLevel,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import {
  selectIslandOverlay,
  selectIslandZoomLevel,
} from "redux-state/selectors/island"
import { ISLAND_BOX } from "shared/constants"
import { useValueRef, useBeforeFirstPaint, useOnResize } from "shared/hooks"
import {
  getWindowDimensions,
  getMinimumScale,
  limitToBounds,
} from "shared/utils"
import Controls from "ui/Controls"
import Background from "./Background"
import Realms from "./IslandRealms"
import RealmPin from "./RealmPin"

export default function InteractiveIsland() {
  const settingsRef = useRef({ minScale: 0 })
  const [stageBounds, setStageDimensions] = useState(() =>
    getWindowDimensions()
  )
  const islandRef = useRef<Konva.Stage | null>(null)

  const overlay = useDappSelector(selectIslandOverlay)
  const zoomLevel = useDappSelector(selectIslandZoomLevel)
  const dispatch = useDappDispatch()

  const stageFns = useValueRef(() => {
    const resetZoom = () => {
      const box = {
        width: stageBounds.width,
        height: stageBounds.height,
      }

      const minZoom = getMinimumScale(ISLAND_BOX, box)
      settingsRef.current.minScale = minZoom

      dispatch(setIslandZoomLevel(minZoom))
      stageFns.current.centerIsland(minZoom)
    }

    const centerIsland = (scale: number) => {
      const islandNode = islandRef.current
      if (islandNode) {
        islandNode.absolutePosition({
          x: -Math.abs((ISLAND_BOX.width * scale - stageBounds.width) / 2),
          y: -Math.abs((ISLAND_BOX.height * scale - stageBounds.height) / 2),
        })
      }
    }

    return { centerIsland, resetZoom }
  })

  useBeforeFirstPaint(() => {
    const stage = islandRef.current
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

        const maxX = ISLAND_BOX.width - stage.width() / newScale
        const maxY = ISLAND_BOX.height - stage.height() / newScale

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
        dispatch(setIslandZoomLevel(newScale))
      }
      acc = 0
    })

    const handler: Konva.KonvaEventListener<Konva.Stage, WheelEvent> = ({
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

    // re-center & reset island zoom on resize
    requestAnimationFrame(() => stageFns.current.resetZoom())
  })

  // Set initial zoom
  useBeforeFirstPaint(() => stageFns.current.resetZoom())

  const restrictDragBounds = useCallback(function restrictDragging(
    this: Konva.Node,
    position: Konva.Vector2d
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const stage = this
    const scale = stage.scaleX()
    const width = stage.width()
    const height = stage.height()

    const maxX = ISLAND_BOX.width - width / scale
    const maxY = ISLAND_BOX.height - height / scale

    const finalX = limitToBounds(position.x, -maxX * scale, 0)
    const finalY = limitToBounds(position.y, -maxY * scale, 0)

    return { x: finalX, y: finalY }
  },
  [])

  return (
    <>
      <Stage
        ref={islandRef}
        draggable
        dragBoundFunc={restrictDragBounds}
        scale={{ x: zoomLevel, y: zoomLevel }}
        width={stageBounds.width}
        height={stageBounds.height}
      >
        <Layer>
          <Background overlay={overlay} />
          <Realms />
          <RealmPin />
        </Layer>
      </Stage>
      <Controls />
    </>
  )
}
