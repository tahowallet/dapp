import React, { memo, useEffect, useMemo, useRef } from "react"
import { Image } from "react-konva"
import type Konva from "konva"
import "gifler"
import { isBrowser } from "shared/utils"

type GifProps = {
  src: string
  width: number
  height: number
  x?: number
  y?: number
  scaleY?: number
  listening?: boolean
}

function Gif({
  src,
  x = 0,
  y = 0,
  width,
  height,
  scaleY,
  listening = false,
}: GifProps) {
  const imageRef = useRef<Konva.Image | null>(null)
  const canvas = useMemo(() => document.createElement("canvas"), [])

  useEffect(() => {
    let anim: Gifler.Animator
    if (isBrowser) {
      window.gifler(src).get((a) => {
        anim = a
        anim.animateInCanvas(canvas)
        anim.onDrawFrame = (ctx, frame) => {
          ctx.drawImage(frame.buffer, frame.x, frame.y)
          imageRef.current?.getLayer()?.draw()
        }
      })
    }
    return () => anim?.stop()
  }, [src, canvas])

  return (
    <Image
      x={x}
      y={y}
      width={width}
      height={height}
      scaleY={scaleY}
      image={canvas}
      ref={imageRef}
      listening={listening}
    />
  )
}

export default memo(Gif)
