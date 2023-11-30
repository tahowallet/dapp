import React from "react"
import { Image } from "react-konva"
import vampireQuestLineImg from "shared/assets/vampire-quest-line.svg"
import { FIGMA_FACTOR } from "shared/constants"
import useImage from "use-image"

export default function VampireQuest() {
  const [vampireQuestLine] = useImage(vampireQuestLineImg)

  return (
    <Image
      image={vampireQuestLine}
      width={213 * FIGMA_FACTOR.X}
      height={175 * FIGMA_FACTOR.Y}
      x={857}
      y={1274}
      listening={false}
    />
  )
}
