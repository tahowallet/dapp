import Konva from "konva"
import React, { useRef } from "react"
import { Image } from "react-konva"
import newRealmLabelImg from "shared/assets/new-realm-label.svg"
import { getNewRealmLabelShift } from "shared/utils"
import useImage from "use-image"

type NewRealmLabelProps = {
  realmId: string
  x: number
  y: number
}

export default function NewRealmLabel({ realmId, x, y }: NewRealmLabelProps) {
  const [newRealmLabel] = useImage(newRealmLabelImg)
  const newRealmLabelRef = useRef<Konva.Image>(null)

  const labelShift = getNewRealmLabelShift(realmId)
  const labelX = x - labelShift.x
  const labelY = y + labelShift.y

  return (
    <Image
      ref={newRealmLabelRef}
      image={newRealmLabel}
      scaleX={3.5}
      scaleY={3.5}
      x={labelX}
      y={labelY}
      listening={false}
    />
  )
}
