import React, { useEffect, useMemo, useRef, useState } from "react"
import Konva from "konva"
import { Image } from "react-konva"
import { ImageConfig } from "konva/lib/shapes/Image"
import useImage from "use-image"

type KonvaVideoProps = {
  x: number
  y: number
  height: number
  width: number
  src: string
  loop?: boolean
  videoProps?: Partial<ImageConfig>
}

function extractFirstVideoFrame(
  video: HTMLVideoElement,
  width: number,
  height: number
) {
  const canvas = document.createElement("canvas")

  canvas.width = width
  canvas.height = height

  const canvasCtx = canvas.getContext("2d")

  canvasCtx?.drawImage(video, 0, 0, canvas.width, canvas.height)
  const firstFrame = canvas.toDataURL()

  canvas.remove()

  return firstFrame
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
  const [videoPaused, setVideoPaused] = useState(true)

  const videoElement = useMemo(() => {
    const element = document.createElement("video")
    element.src = src
    element.loop = loop

    return element
  }, [src, loop])

  useEffect(() => {
    if (!imageRef.current) return () => {}

    const handleVideoPLay = () => {
      videoElement.play()
      setVideoPaused(false)
    }

    document.addEventListener("click", handleVideoPLay)

    const imageLayer = imageRef.current.getLayer()

    // use Konva.Animation to redraw a layer
    const animation = new Konva.Animation(() => {}, imageLayer)
    animation.start()

    return () => {
      document.removeEventListener("click", handleVideoPLay)
      animation.stop()
    }
  }, [videoElement, imageRef])

  const [firstFrame] = useImage(
    extractFirstVideoFrame(videoElement, width, height)
  )

  return (
    <Image
      ref={imageRef}
      image={videoPaused ? firstFrame : videoElement}
      x={x}
      y={y}
      width={width}
      height={height}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...videoProps}
    />
  )
}
