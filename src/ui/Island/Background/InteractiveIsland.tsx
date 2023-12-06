import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { Layer, Stage } from "react-konva"
import type Konva from "konva"
// import rafSchd from "raf-schd"
import {
  selectDisplayedRealmId,
  selectRealmPanelVisible,
  setIslandZoomLevel,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import {
  selectIslandOverlay,
  selectIslandZoomLevel,
} from "redux-state/selectors/island"
import { ISLAND_BOX, getRealmPosition } from "shared/constants"
import {
  useValueRef,
  useBeforeFirstPaint,
  useOnResize,
  useTabletScreen,
} from "shared/hooks"
import {
  getWindowDimensions,
  getMinimumScale,
  limitToBounds,
} from "shared/utils"
import Assistant from "ui/Assistant"
import IslandBackground from "./IslandBackground"
import Realms from "../Realms/IslandRealms"
import RealmPin from "../Details/RealmPin"
import Clouds from "../Details/Clouds"
import AttackLine from "../Details/AttackLine"

function InteractiveIsland() {
  const selectedRealmId = useDappSelector(selectDisplayedRealmId)
  const selectedRealmPanelVisible = useDappSelector(selectRealmPanelVisible)
  const isTablet = useTabletScreen()
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

  const restrictDragBounds = useCallback(
    function restrictDragging(this: Konva.Node, position: Konva.Vector2d) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const stage = this
      const width = stage.width()
      const scale = stage.scaleX()
      const height = stage.height()

      let maxX
      let maxY

      if (selectedRealmPanelVisible) {
        maxX = 2 * width
        maxY = 2 * height
      } else {
        maxX = -(ISLAND_BOX.width - width / scale) * scale
        maxY = -(ISLAND_BOX.height - height / scale) * scale
      }

      const finalX = limitToBounds(position.x, maxX, 0)
      const finalY = limitToBounds(position.y, maxY, 0)

      return { x: finalX, y: finalY }
    },
    [selectedRealmPanelVisible]
  )

  useEffect(() => {
    const stage = islandRef.current
    if (stage) {
      const stageWidth = stage.width()
      const stageHeight = stage.height()
      const stageScaleX = stage.scaleX()
      const stageScaleY = stage.scaleY()

      if (selectedRealmId && selectedRealmPanelVisible) {
        const { x, y, width, height } = getRealmPosition(selectedRealmId)
        const newPosX = isTablet
          ? stageWidth / 1.33 - (x + width / 2) * stageScaleX
          : stageWidth / 2 - (x + width / 2) * stageScaleX
        const newPosY = stageHeight / 2 - (y + height / 2) * stageScaleY

        stage?.to({ x: newPosX, y: newPosY })
      } else if (!selectedRealmPanelVisible) {
        const scale = getMinimumScale(ISLAND_BOX, {
          width: stageBounds.width,
          height: stageBounds.height,
        })
        stage.to({
          x: -Math.abs((ISLAND_BOX.width * scale - stageBounds.width) / 2),
          y: -Math.abs((ISLAND_BOX.height * scale - stageBounds.height) / 2),
        })
      }
    }
  }, [selectedRealmId, selectedRealmPanelVisible, stageBounds, isTablet])

  return (
    <>
      <Stage
        ref={islandRef}
        draggable={!selectedRealmId}
        dragBoundFunc={restrictDragBounds}
        scale={{ x: zoomLevel, y: zoomLevel }}
        width={stageBounds.width}
        height={stageBounds.height}
      >
        <Layer>
          <IslandBackground overlay={overlay} />
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
