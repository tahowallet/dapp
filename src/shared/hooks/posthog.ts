import { usePostHog } from "posthog-js/react"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useMobileScreen } from "./screen"

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
