import React, { useState } from "react"
import { Path } from "react-konva"
import { useMapContext } from "./MapContext"

type ZoneProps = {
  id: string
  path: string
  width: number
  height: number
  x: number
  y: number
}

export default function Zone(props: ZoneProps) {
  const { path, width, height, x, y, id } = props
  const [isHovered, setIsHovered] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const mapContext = useMapContext()

  const handleZoneClick = () => {
    setIsSelected((prev) => !prev)
    mapContext.current.onZoneClick(id)
  }

  return (
    <>
      {!isSelected && (
        // This path is used to create the overlay effect
        <Path
          x={x}
          y={y}
          data={path}
          width={width}
          height={height}
          fill="#1F3D3B"
          opacity={0.4}
          listening={false}
          globalCompositeOperation="hard-light"
        />
      )}
      <Path
        x={x}
        y={y}
        data={path}
        width={width}
        height={height}
        stroke={isHovered ? "#fff" : "#fff"}
        strokeWidth={4}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleZoneClick}
      />
    </>
  )
}
