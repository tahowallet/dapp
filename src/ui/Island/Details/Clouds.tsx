import React, { memo, useEffect, useRef } from "react"
import { Group, Image as KonvaImage } from "react-konva"
import Konva from "konva"
import useImage from "use-image"

import cloudBottomRight from "shared/assets/clouds/cloud-bottom-right.png"
import cloudTopLeft from "shared/assets/clouds/cloud-top-left.png"
import cloudTopRight from "shared/assets/clouds/cloud-top-right.png"
import { FIGMA_FACTOR } from "shared/constants"

const AMPLITUDE = 15
const PERIOD = 20000

function Clouds() {
  const [cloudTopLeftImage] = useImage(cloudTopLeft)
  const [cloudTopRightImage] = useImage(cloudTopRight)
  const [cloudBottomRightImage] = useImage(cloudBottomRight)

  const cloudTopLeftRef = useRef<Konva.Image>(null)
  const cloudTopRightRef = useRef<Konva.Image>(null)
  const cloudBottomRightRef = useRef<Konva.Image>(null)

  useEffect(() => {
    const cloudAnimation = new Konva.Animation((frame) => {
      if (!frame) return

      const posX = AMPLITUDE * Math.sin((frame.time * 2 * Math.PI) / PERIOD)
      const posY = AMPLITUDE * Math.sin((frame.time * 4 * Math.PI) / PERIOD)

      cloudTopLeftRef.current?.position({
        x: 27 * FIGMA_FACTOR.X + posY,
        y: 85 * FIGMA_FACTOR.Y + posX,
      })

      cloudTopRightRef.current?.position({
        x: 900 * FIGMA_FACTOR.X + posX,
        y: 251 * FIGMA_FACTOR.Y + posY,
      })

      cloudBottomRightRef.current?.position({
        x: 640 * FIGMA_FACTOR.X + posX,
        y: 380 * FIGMA_FACTOR.Y + posY,
      })
    })

    cloudAnimation.start()
  }, [])

  return (
    <Group listening={false}>
      <KonvaImage
        ref={cloudTopLeftRef}
        x={27 * FIGMA_FACTOR.X}
        y={85 * FIGMA_FACTOR.Y}
        width={642 * FIGMA_FACTOR.X}
        height={204 * FIGMA_FACTOR.Y}
        image={cloudTopLeftImage}
      />
      <KonvaImage
        ref={cloudTopRightRef}
        x={900 * FIGMA_FACTOR.X}
        y={251 * FIGMA_FACTOR.Y}
        width={452 * FIGMA_FACTOR.X}
        height={204 * FIGMA_FACTOR.Y}
        image={cloudTopRightImage}
      />
      <KonvaImage
        ref={cloudBottomRightRef}
        x={640 * FIGMA_FACTOR.X}
        y={340 * FIGMA_FACTOR.Y}
        width={968 * FIGMA_FACTOR.X}
        height={644 * FIGMA_FACTOR.Y}
        image={cloudBottomRightImage}
      />
    </Group>
  )
}

export default memo(Clouds)
