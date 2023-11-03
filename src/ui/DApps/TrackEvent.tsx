import { ReactNode, useEffect } from "react"
import { useLocation } from "react-router-dom"
// eslint-disable-next-line import/no-extraneous-dependencies
import { usePostHog } from "posthog-js/react"

export default function TrackEvents({ children }: { children: ReactNode[] }) {
  const location = useLocation()
  const posthog = usePostHog()

  useEffect(() => {
    posthog?.capture("$pageview", { url: location.pathname })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}
