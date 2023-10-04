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

// Source: https://usehooks-ts.com/react-hook/use-interval
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return () => {}
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => {
      clearInterval(id)
    }
  }, [delay])
}

export function useAssets(assets: string[]) {
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  // TODO: modify this to also accept video as an asset
  useLayoutEffect(() => {
    let loaded = 0

    assets.forEach((asset) => {
      const img = new Image()
      img.src = asset
      img.onload = () => {
        loaded += 1
        if (loaded === assets.length) {
          setAssetsLoaded(true)
        }
      }
    })
  }, [assets])

  return assetsLoaded
}
