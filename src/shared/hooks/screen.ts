import { getWindowDimensions } from "shared/utils"
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "shared/constants"
import { useState } from "react"
import { VoidFn } from "shared/types/utils"
import { useBeforeFirstPaint } from "./helpers"

/**
 * Subscribes an event listener to the window resize event
 */
export function useOnResize<T extends VoidFn>(callback: T): void {
  useBeforeFirstPaint(() => {
    window.addEventListener("resize", callback)

    return () => window.removeEventListener("resize", callback)
  })
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
