import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Group, Image as KonvaImage, Rect } from "react-konva"
import Konva from "konva"
import { Easings } from "konva/lib/Tween"
import useImage from "use-image"

import backgroundImg from "public/dapp_island_bg_bw.webp"
import {
  ISLAND_BOX,
  REALMS_MAP_DATA,
  REALM_PANEL_ANIMATION_TIME,
} from "shared/constants"
import { usePrevious, useBeforeFirstPaint, useTimeout } from "shared/hooks"
import { createBackgroundMask } from "shared/utils"
import { OverlayType } from "shared/types"
import BackgroundOverlay from "ui/Island/Background/BackgroundOverlay"
import { selectRealmPanelVisible, useDappSelector } from "redux-state"

const getOverlay = (overlay: OverlayType) => {
  if (overlay === "dark") {
    return (
      <>
        <Rect
          fill="#1F3D3B"
          width={ISLAND_BOX.width}
          height={ISLAND_BOX.height}
          globalCompositeOperation="color"
          stroke="#1C2D2D"
        />
        <Rect
          opacity={0.4}
          fill="#1F3D3B"
          width={ISLAND_BOX.width}
          height={ISLAND_BOX.height}
          globalCompositeOperation="hard-light"
        />
        <Rect
          opacity={0.4}
          fill="#545858"
          width={ISLAND_BOX.width}
          height={ISLAND_BOX.height}
          globalCompositeOperation="saturation"
        />
      </>
    )
  }

  if (overlay === "subtle") {
    return (
      <Rect
        fill="#1F3D3B"
        width={ISLAND_BOX.width}
        height={ISLAND_BOX.height}
        globalCompositeOperation="hard-light"
      />
    )
  }

  return null
}

export default function IslandBackground({
  overlay,
}: {
  overlay: OverlayType
}) {
  const [islandImage] = useImage(backgroundImg)
  // const overlayRef = useRef<Konva.Group | null>(null)
  // const [currentOverlay, setCurrentOverlay] = useState<JSX.Element | null>(null)
  // const [isMounted, setIsMounted] = useState(false)

  // const previousOverlay = usePrevious(overlay)

  // useBeforeFirstPaint(() => {
  //   setIsMounted(true)
  //   const layer = overlayRef.current

  //   if (layer) {
  //     const maxOpacity = overlay === "dark" ? 1 : 0.4

  //     layer.opacity(maxOpacity)
  //     setCurrentOverlay(getOverlay(overlay))
  //   }
  // })

  // useLayoutEffect(() => {
  //   const layer = overlayRef.current
  //   if (!layer || overlay === previousOverlay || !isMounted) return

  //   if (overlay === "none") {
  //     layer.to({ opacity: 0, duration: 0.5, easing: Easings.EaseIn })
  //     return
  //   }

  //   if (overlay !== previousOverlay) {
  //     const maxOpacity = overlay === "dark" ? 1 : 0.4

  //     layer.to({
  //       opacity: overlay ? maxOpacity : 0,
  //       duration: 0.5,
  //       easing: overlay ? Easings.EaseOut : Easings.EaseIn,
  //     })

  //     setCurrentOverlay(getOverlay(overlay))
  //   }
  // }, [isMounted, overlay, previousOverlay])

  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)

  // Handles extended canvas background color change
  useEffect(() => {
    if (realmPanelVisible) {
      return document.body.classList.add("overlay")
    }

    const timeout = setTimeout(
      () => document.body.classList.remove("overlay"),
      REALM_PANEL_ANIMATION_TIME
    )

    return () => clearTimeout(timeout)
  }, [realmPanelVisible])

  const mask = useMemo(() => {
    if (!islandImage) {
      return undefined
    }

    return createBackgroundMask(REALMS_MAP_DATA, islandImage)
  }, [islandImage])

  return (
    <Group listening={false}>
      <KonvaImage
        image={mask}
        stroke="#1c2928"
        strokeWidth={realmPanelVisible ? 5 : 0}
      />
      <BackgroundOverlay />
      {/* <Group ref={overlayRef}>{currentOverlay}</Group> */}
    </Group>
  )
}
