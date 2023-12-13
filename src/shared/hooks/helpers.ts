/* eslint-disable no-console */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import debounce from "lodash/debounce"
import { useSpring } from "@react-spring/web"
import { VoidFn } from "shared/types/utils"

export const useDebounce = <T>(initial: T, wait = 300): [T, (v: T) => void] => {
  const [state, setState] = useState(initial)

  const debounceCallback = useMemo(
    () => debounce((prop: T) => setState(prop), wait),
    [wait]
  )

  return [state, debounceCallback]
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

// Source: https://usehooks-ts.com/react-hook/use-timeout
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setTimeout(() => savedCallback.current(), delay)

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(id)
  }, [delay])
}

// Transition depending on the component visibility
export function useVisibilityTransition(state: boolean) {
  return useSpring({ opacity: state ? 1 : 0 })
}

export function useAssets(assets: string[]) {
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useLayoutEffect(() => {
    let loaded = 0

    const checkAssetsLoaded = () => {
      loaded += 1
      if (loaded === assets.length) setAssetsLoaded(true)
    }

    assets.forEach((asset) => {
      if (asset.endsWith(".mp4") || asset.endsWith(".webm")) {
        const video = document.createElement("video")
        video.src = asset
        video.onloadeddata = () => {
          if (video.readyState === 4) checkAssetsLoaded()
        }
      } else {
        const img = new Image()
        img.src = asset
        img.onload = checkAssetsLoaded
      }
    })
    // The useLayoutEffect hook should only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return assetsLoaded
}
