import React, { useLayoutEffect, useMemo, useRef } from "react"
import { Group, Image as KonvaImage, Rect } from "react-konva"
import { Easings } from "konva/lib/Tween"
import useImage from "use-image"

import backgroundImg from "../public/dapp_map_bg.webp"
import { createBackgroundMask } from "./utils"
import { KonvaRect } from "./types"
import { MAP_BOX, zones } from "./constants"

export default function Background({ overlay }: { overlay: boolean }) {
  const [mapImage] = useImage(backgroundImg)
  const layerRef = useRef<KonvaRect | null>(null)

  useLayoutEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    layer.to({
      opacity: overlay ? 0.4 : 0,
      duration: 0.5,
      easing: overlay ? Easings.EaseOut : Easings.EaseIn,
    })
  }, [overlay])

  const mask = useMemo(() => {
    if (!mapImage) {
      return undefined
    }

    return createBackgroundMask(zones, mapImage)
  }, [mapImage])

  return (
    <Group listening={false}>
      <KonvaImage fill="#3e7270" image={mask} />
      <Rect
        ref={layerRef}
        opacity={0}
        fill="#1F3D3B66"
        width={MAP_BOX.width}
        height={MAP_BOX.height}
        globalCompositeOperation="hard-light"
      />
    </Group>
  )
}
