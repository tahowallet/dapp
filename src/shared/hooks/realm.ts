/* eslint-disable import/prefer-default-export */
import { useSpring } from "@react-spring/web"
import { useMemo } from "react"
import { selectDisplayedRealmId, useDappSelector } from "redux-state"

export function useRealmPanelTransition(position: "left" | "right") {
  const displayedRealm = useDappSelector(selectDisplayedRealmId)

  const styles = useMemo(
    () => ({
      base: {
        overflow: "visible auto",
        position: "absolute",
        top: 0,
        padding: "180px 0",
        height: "100vh",
        maxWidth: 480,
      },
      hidden: position === "left" ? { left: -480 } : { right: -480 },
      open: position === "left" ? { left: 0 } : { right: 0 },
    }),
    [position]
  )

  const [props] = useSpring(() => {
    const destinationStyle = displayedRealm ? styles.open : styles.hidden

    return {
      from: { ...styles.base, ...styles.hidden },
      to: { ...styles.base, ...destinationStyle },
    }
  }, [displayedRealm])

  return props
}
