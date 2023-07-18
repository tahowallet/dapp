import React from "react"
import { Image } from "react-konva"
import useImage from "use-image"
import { MAP_BOX } from "./constants"
import backgroundImg from "../public/dapp_map_bg.webp"

export default function Background() {
  const [mapImage] = useImage(backgroundImg)

  return (
    <Image
      image={mapImage}
      x={0}
      y={0}
      width={MAP_BOX.width}
      height={MAP_BOX.height}
    />
  )
}
