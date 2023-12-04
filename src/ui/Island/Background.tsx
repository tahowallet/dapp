import React, { useLayoutEffect, useMemo, useRef, useState } from "react"
import { Group, Image as KonvaImage, Rect } from "react-konva"
import type Konva from "konva"
import { Easings } from "konva/lib/Tween"
import useImage from "use-image"

import backgroundImg from "public/dapp_island_bg.webp"
import { ISLAND_BOX, REALMS_MAP_DATA } from "shared/constants"
import { usePrevious, useBeforeFirstPaint } from "shared/hooks"
import { createBackgroundMask } from "shared/utils"
import { OverlayType } from "shared/types"

const getOverlay = (overlay: OverlayType) => {
  if (overlay === "dark") {
    return (
      <>
        <Rect
          opacity={1}
          fill="#1F3D3B"
          width={ISLAND_BOX.width}
          height={ISLAND_BOX.height}
          globalCompositeOperation="color"
        />
        <Rect
          opacity={0.4}
          fill="#1F3D3B"
          width={ISLAND_BOX.width}
          height={ISLAND_BOX.height}
          globalCompositeOperation="hard-light"
          stroke="#172828"
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

export default function Background({ overlay }: { overlay: OverlayType }) {
  const [islandImage] = useImage(backgroundImg)
  const overlayRef = useRef<Konva.Group | null>(null)
  const [currentOverlay, setCurrentOverlay] = useState<JSX.Element | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const previousOverlay = usePrevious(overlay)

  useBeforeFirstPaint(() => {
    setIsMounted(true)
    const layer = overlayRef.current

    if (layer) {
      const maxOpacity = overlay === "dark" ? 1 : 0.4

      layer.opacity(maxOpacity)
      setCurrentOverlay(getOverlay(overlay))
    }
  })

  useLayoutEffect(() => {
    const layer = overlayRef.current
    if (!layer || overlay === previousOverlay || !isMounted) return

    if (overlay === "none") {
      layer.to({ opacity: 0, duration: 0.5, easing: Easings.EaseIn })
      return
    }

    if (overlay !== previousOverlay) {
      const maxOpacity = overlay === "dark" ? 1 : 0.4

      layer.to({
        opacity: overlay ? maxOpacity : 0,
        duration: 0.5,
        easing: overlay ? Easings.EaseOut : Easings.EaseIn,
      })

      setCurrentOverlay(getOverlay(overlay))
    }
  }, [isMounted, overlay, previousOverlay])

  const mask = useMemo(() => {
    if (!islandImage) {
      return undefined
    }

    return createBackgroundMask(REALMS_MAP_DATA, islandImage)
  }, [islandImage])

  return (
    <Group listening={false}>
      <KonvaImage image={mask} />
      <Group opacity={0} ref={overlayRef}>
        {currentOverlay}
      </Group>
    </Group>
  )
}
