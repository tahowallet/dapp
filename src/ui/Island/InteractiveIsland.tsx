import React, { memo, useCallback, useRef, useState } from "react"
import { Layer, Stage } from "react-konva"
import type Konva from "konva"
// import rafSchd from "raf-schd"
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
  // calculateNewIslandScale,
  // calculateIslandPosition,
  // getCurrentCanvasPosition,
} from "shared/utils"
// import Controls from "ui/Controls"
import Assistant from "ui/Assistant"
import Background from "./Background"
import Realms from "./IslandRealms"
import RealmPin from "./IslandRealmsDetails/RealmPin"
import Clouds from "./Clouds"
import AttackLine from "./IslandRealmsDetails/AttackLine"

function InteractiveIsland() {
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
      const islandRealm = islandRef.current
      if (islandRealm) {
        islandRealm.absolutePosition({
          x: -Math.abs((ISLAND_BOX.width * scale - stageBounds.width) / 2),
          y: -Math.abs((ISLAND_BOX.height * scale - stageBounds.height) / 2),
        })
      }
    }

    return { centerIsland, resetZoom }
  })

  // useBeforeFirstPaint(() => {
  //   const stage = islandRef.current
  //   if (!stage) return () => {}

  //   let acc = 0

  //   const handleZoom = rafSchd((delta: number) => {
  //     const zoom = stage.scaleX()
  //     const zoomFactor = 0.001
  //     const { minScale } = settingsRef.current

  //     const newScale = calculateNewIslandScale(
  //       zoom + delta * -zoomFactor,
  //       minScale
  //     )

  //     const stagePos = stage.absolutePosition()
  //     const pointer = stage.getPointerPosition()

  //     if (pointer && newScale !== zoom) {
  //       // Get current mouse position in the canvas
  //       const pointerCanvasPos = getCurrentCanvasPosition(
  //         -(pointer.x - stagePos.x),
  //         -(pointer.y - stagePos.y),
  //         zoom
  //       )

  //       // Add back pointer position to retrieve "same canvas position" offset
  //       const targetX = pointerCanvasPos.x * newScale + pointer.x
  //       const targetY = pointerCanvasPos.y * newScale + pointer.y

  //       // Force bounds while zooming in/out
  //       stage.absolutePosition(
  //         calculateIslandPosition(stage, newScale, targetX, targetY)
  //       )

  //       // Update the stage scale
  //       dispatch(setIslandZoomLevel(newScale))
  //     }
  //     acc = 0
  //   })

  //   const handler: Konva.KonvaEventListener<Konva.Stage, WheelEvent> = ({
  //     evt: domEvent,
  //   }) => {
  //     domEvent.preventDefault()
  //     acc += domEvent.deltaY
  //     handleZoom(acc)
  //   }

  //   stage.on("wheel", handler)
  //   return () => stage.off("wheel", handler)
  // })

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
          <Clouds />
          <RealmPin />
          <AttackLine />
        </Layer>
      </Stage>
      <Assistant />
      {/* <Controls
        stage={islandRef.current}
        minScale={settingsRef.current.minScale}
      /> */}
    </>
  )
}

export default memo(InteractiveIsland)
