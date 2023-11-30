/* eslint-disable import/prefer-default-export */
import { easings, useSpring } from "@react-spring/web"
import { useMemo } from "react"
import { selectRealmPanelVisible, useDappSelector } from "redux-state"
import { REALM_PANEL_ANIMATION_TIME } from "shared/constants"

export function useRealmPanelTransition(position: "left" | "right") {
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)

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
    const destinationStyle = realmPanelVisible ? styles.open : styles.hidden

    return {
      from: { ...styles.base, ...styles.hidden },
      to: { ...styles.base, ...destinationStyle },
      config: {
        duration: REALM_PANEL_ANIMATION_TIME,
        easing: easings.easeOutCubic,
      },
    }
  }, [realmPanelVisible])

  return props
}
