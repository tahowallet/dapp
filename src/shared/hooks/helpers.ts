/* eslint-disable no-console */
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { debounce } from "lodash"
import { useSpring } from "@react-spring/web"
import { getWindowDimensions } from "shared/utils"
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "shared/constants"
import { usePostHog } from "posthog-js/react"
import { useLocation } from "react-router-dom"

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

// Source: https://sabesh.hashnode.dev/update-components-based-on-localstorage-change-in-react-hooks
export function useLocalStorageChange<T>(key: string): {
  value: T | null
  updateStorage: (newValue: Partial<T>) => void
} {
  const getInitialValue = () => {
    try {
      return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key)!)
        : null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const [value, setValue] = useState(getInitialValue())

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key) return
      try {
        setValue(e.newValue ? JSON.parse(e.newValue) : null)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [key])

  const updateStorage = (newValue: Partial<T>) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))

      const event = new StorageEvent("storage", {
        key,
        newValue: JSON.stringify(newValue),
      })

      window.dispatchEvent(event)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return { value, updateStorage }
}

export function useTabletScreen() {
  const [width, setWidth] = useState(window.innerWidth)

  useOnResize(() => {
    const windowSize = getWindowDimensions()
    setWidth(windowSize.width)
  })

  return width < TABLET_BREAKPOINT
}

export function useMobileScreen() {
  const [width, setWidth] = useState(window.innerWidth)

  useOnResize(() => {
    const windowSize = getWindowDimensions()
    setWidth(windowSize.width)
  })

  return width < MOBILE_BREAKPOINT
}

export function useUnLoad() {
  const posthog = usePostHog()

  useEffect(() => {
    const onUnload = () => {
      posthog?.capture("$pageleave")
    }
    window.addEventListener("beforeunload", onUnload)
    return () => {
      window.removeEventListener("beforeunload", onUnload)
    }
  }, [posthog])
}

export function useTrackEvents() {
  const location = useLocation()
  const posthog = usePostHog()
  const isMobile = useMobileScreen()

  useEffect(() => {
    posthog?.capture("$pageview", {
      url: location.pathname,
      data: { isMobile },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

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
