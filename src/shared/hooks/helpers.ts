import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { debounce } from "lodash"

type VoidFn = () => unknown

export const useDebounce = <T>(initial: T, wait = 300): [T, (v: T) => void] => {
  const [state, setState] = useState(initial)

  const debounceCallback = useMemo(
    () => debounce((prop: T) => setState(prop), wait),
    [wait]
  )

  return [state, debounceCallback]
}

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState(
    () => localStorage.getItem(key) || initialValue
  )

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
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
 * Returns a lagging value of the previous render
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>()

  useLayoutEffect(() => {
    ref.current = value
  })

  return ref.current
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
