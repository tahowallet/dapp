import React, { useEffect, useMemo, useRef } from "react"
import Konva from "konva"
import { Image } from "react-konva"
import { ImageConfig } from "konva/lib/shapes/Image"

type KonvaVideoProps = {
  x: number
  y: number
  height: number
  width: number
  src: string
  loop?: boolean
  videoProps?: Partial<ImageConfig>
}

// Source: https://codesandbox.io/p/sandbox/react-konva-video-on-canvas-oygvf?file=%2Fsrc%2Findex.js%3A22%2C31
export default function KonvaVideo({
  x,
  y,
  height,
  width,
  src,
  loop = true,
  videoProps,
}: KonvaVideoProps) {
  const imageRef = useRef<Konva.Image>(null)

  const videoElement = useMemo(() => {
    const element = document.createElement("video")
    element.src = src
    element.loop = loop

    return element
  }, [src, loop])

  useEffect(() => {
    if (!imageRef.current) return () => {}

    // Source: https://stackoverflow.com/a/68128950
    const handleVideoPLay = async () => {
      const playPromise = videoElement.play()

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoElement.muted = true
          videoElement.play()
        })
      }
    }

    handleVideoPLay()
    const imageLayer = imageRef.current.getLayer()

    // use Konva.Animation to redraw a layer
    const animation = new Konva.Animation(() => {}, imageLayer)
    animation.start()

    return () => animation.stop()
  }, [videoElement, imageRef])

  return (
    <Image
      ref={imageRef}
      image={videoElement}
      x={x}
      y={y}
      width={width}
      height={height}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...videoProps}
    />
  )
}
