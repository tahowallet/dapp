import React, { memo } from "react"
import { Group } from "react-konva"
import netGif from "shared/assets/island-overlay-net.gif"
import { FIGMA_FACTOR } from "shared/constants"
import Gif from "../../../shared/components/Media/Gif"

function NetOverlay() {
  return (
    <Group listening={false} opacity={0.3}>
      <Gif
        src={netGif}
        width={700 * FIGMA_FACTOR.X}
        height={197 * FIGMA_FACTOR.Y}
        x={600 * FIGMA_FACTOR.X}
        y={-20 * FIGMA_FACTOR.Y}
      />
      <Gif
        src={netGif}
        width={700 * FIGMA_FACTOR.X}
        height={197 * FIGMA_FACTOR.Y}
        x={-30 * FIGMA_FACTOR.X}
        y={1150 * FIGMA_FACTOR.Y}
        scaleY={-1}
      />
      <Gif
        src={netGif}
        width={700 * FIGMA_FACTOR.X}
        height={197 * FIGMA_FACTOR.Y}
        x={1150 * FIGMA_FACTOR.X}
        y={1200 * FIGMA_FACTOR.Y}
        scaleY={-1}
      />
    </Group>
  )
}

export default memo(NetOverlay)
