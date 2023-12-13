import { MutableRefObject, useLayoutEffect, useRef } from "react"

export function useMultiRef<T>(): [
  MutableRefObject<(T | null)[]>,
  (element: T | null, index: number) => void
] {
  const multiRef = useRef<(T | null)[]>([])

  const addMultiRef = (element: T | null, index: number) => {
    multiRef.current[index] = element
  }

  return [multiRef, addMultiRef]
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
