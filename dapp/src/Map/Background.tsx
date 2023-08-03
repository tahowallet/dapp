import React, { useLayoutEffect, useMemo, useRef, useState } from "react"
import { Group, Image as KonvaImage, Rect } from "react-konva"
import { Easings } from "konva/lib/Tween"
import useImage from "use-image"

import { createBackgroundMask, useBeforeFirstPaint, usePrevious } from "./utils"
import { KonvaGroup } from "./types"
import { MAP_BOX, zones } from "./constants"

import backgroundImg from "../public/dapp_map_bg.webp"

type OverlayType = "dark" | "subtle" | "none"

const getOverlay = (overlay: OverlayType) => {
  if (overlay === "dark") {
    return (
      <>
        <Rect
          opacity={1}
          fill="#1F3D3B"
          width={MAP_BOX.width}
          height={MAP_BOX.height}
          globalCompositeOperation="color"
        />
        <Rect
          opacity={0.4}
          fill="#1F3D3B"
          width={MAP_BOX.width}
          height={MAP_BOX.height}
          globalCompositeOperation="hard-light"
        />
        <Rect
          opacity={0.4}
          fill="#545858"
          width={MAP_BOX.width}
          height={MAP_BOX.height}
          globalCompositeOperation="saturation"
        />
      </>
    )
  }

  if (overlay === "subtle") {
    return (
      <Rect
        fill="#1F3D3B"
        width={MAP_BOX.width}
        height={MAP_BOX.height}
        globalCompositeOperation="hard-light"
      />
    )
  }

  return null
}

export default function Background({ overlay }: { overlay: OverlayType }) {
  const [mapImage] = useImage(backgroundImg)
  const overlayRef = useRef<KonvaGroup | null>(null)
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
    if (!mapImage) {
      return undefined
    }

    return createBackgroundMask(zones, mapImage)
  }, [mapImage])

  return (
    <Group listening={false}>
      <KonvaImage fill="#3e7270" image={mask} />
      <Group opacity={0} ref={overlayRef}>
        {currentOverlay}
      </Group>
    </Group>
  )
}
