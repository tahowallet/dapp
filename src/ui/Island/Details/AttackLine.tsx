import React from "react"
import { Image } from "react-konva"
import { selectRealmPanelVisible, useDappSelector } from "redux-state"
import attackLineImg from "shared/assets/attack-line.svg"
import { FIGMA_FACTOR } from "shared/constants"
import useImage from "use-image"

export default function AttackLine() {
  const [attackLine] = useImage(attackLineImg)
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)

  if (realmPanelVisible) return null

  return (
    <Image
      image={attackLine}
      width={213 * FIGMA_FACTOR.X}
      height={175 * FIGMA_FACTOR.Y}
      x={857}
      y={1274}
      listening={false}
    />
  )
}
