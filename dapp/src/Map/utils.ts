import { useLayoutEffect, useRef } from "react"
import { Dimensions } from "./types"

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
  ref.current = val
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
