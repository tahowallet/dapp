import { useLayoutEffect, useRef } from "react"
import assert from "assert"

import { Dimensions, ZoneRenderData } from "./types"

type VoidFn = () => unknown

export function limitToBounds(val: number, min: number, max: number) {
  if (val < min) return min
  if (val > max) return max
  return val
}

/**
 * Returns current window innerWidth/innerHeight
 */
export function getWindowDimensions(): Dimensions {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

/**
 *  Returns the minimum scale to fit content inside a container
 */
export function getMinimumScale(content: Dimensions, container: Dimensions) {
  const containerRatio = container.width / container.height
  const contentRatio = content.width / content.height

  // Content wider than container, use height to determine min scale
  if (contentRatio > containerRatio) {
    const minHeight = Math.min(content.height, container.height)
    const maxHeight = Math.max(content.height, container.height)

    return minHeight / maxHeight
  }

  const minWidth = Math.min(content.width, container.width)
  const maxWidth = Math.max(content.width, container.width)
  return minWidth / maxWidth
}

/**
 * Returns a ref that holds updated values & references
 */
export function useValueRef<T>(value: T) {
  const val = typeof value === "function" ? value() : value
  const ref = useRef<T extends () => infer P ? P : T>(val)

  useLayoutEffect(() => {
    ref.current = val
  })

  return ref
}

/**
 * Runs a callback on mount, as a layout effect
 */
export function useBeforeFirstPaint<T extends VoidFn>(callback: T) {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    const result = callbackRef.current()

    return () => {
      if (typeof result === "function") result()
    }
  }, [])
}

/**
 * Subscribes an event listener to the window resize event
 */
export function useOnResize<T extends VoidFn>(callback: T): void {
  useBeforeFirstPaint(() => {
    window.addEventListener("resize", callback)

    return () => window.removeEventListener("resize", callback)
  })
}

export function queueMicrotask<T extends VoidFn>(callback: T) {
  return Promise.resolve().then(callback)
}

export function createCutoutFromPath(
  zoneData: ZoneRenderData,
  image: HTMLImageElement
) {
  const { x, y, w, h, path } = zoneData
  const canvas = document.createElement("canvas")

  canvas.width = image.width
  canvas.height = image.height

  const ctx = canvas.getContext("2d")

  assert(ctx)

  ctx.translate(x, y)
  ctx.clip(new Path2D(path))
  ctx.translate(-x, -y)
  ctx.drawImage(image, 0, 0)

  const crop = document.createElement("canvas")
  crop.width = w
  crop.height = h

  const cropCtx = crop.getContext("2d")

  assert(cropCtx)

  cropCtx.drawImage(canvas, -x, -y)

  return crop
}

export function createBackgroundMask(
  zones: ZoneRenderData[],
  bgImage: HTMLImageElement
) {
  const canvas = document.createElement("canvas")
  canvas.width = bgImage.width
  canvas.height = bgImage.height
  const ctx = canvas.getContext("2d")

  assert(ctx)

  zones.forEach(({ x, y, path }) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.fillStyle = "#000"
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3
    ctx.fill(new Path2D(path))
    ctx.stroke(new Path2D(path))
    ctx.restore()
  })
  ctx.globalCompositeOperation = "source-out"

  ctx.drawImage(bgImage, 0, 0)
  return canvas
}
