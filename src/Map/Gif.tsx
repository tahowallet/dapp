import React, { useEffect, useMemo, useRef } from "react"
import { Image } from "react-konva"
import type Konva from "konva"
import "gifler"
import { isBrowser } from "../shared/utils"

type GifProps = {
  src: string
  x?: number
  y?: number
}

export default function Gif(props: GifProps) {
  const { src, x = 0, y = 0 } = props
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

  return <Image x={x} y={y} image={canvas} ref={imageRef} />
}
