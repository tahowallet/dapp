import { useRef } from "react"
import { isBrowser } from "../shared/utils"

export const limitToBounds = (val: number, min: number, max: number) => {
  if (val < min) return min
  if (val > max) return max
  return val
}

export function getDimensions(): { width: number; height: number } {
  if (isBrowser) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
  return {
    width: 0,
    height: 0,
  }
}

export function useValueRef<T>(value: T) {
  const ref = useRef<T>(value)
  ref.current = value
  return ref
}

export function queueMicrotask<T extends (args: any) => any>(callback: T) {
  return Promise.resolve().then(callback)
}
