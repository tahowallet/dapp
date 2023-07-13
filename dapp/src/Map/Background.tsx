import React from "react"
import { Image } from "react-konva"
import useImage from "use-image"
import { MAP_BOX } from "./constants"

export default function Background() {
  const [mapImage] = useImage("/dapp_map_bg.webp")

  return (
    <Image image={mapImage} x={0} y={0} width={MAP_BOX.w} height={MAP_BOX.h} />
  )
}
