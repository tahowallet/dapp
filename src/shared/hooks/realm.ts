import { easings, useSpring } from "@react-spring/web"
import { useCallback, useMemo } from "react"
import {
  selectDisplayedRealmId,
  selectRealmPanelVisible,
  setDisplayedRealmId,
  setRealmPanelVisible,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import {
  LOCAL_STORAGE_VISITED_REALM,
  REALM_PANEL_ANIMATION_TIME,
} from "shared/constants"
import { useLocalStorageChange, useTabletScreen } from "./helpers"
// import { useAssistant } from "./assistant"

export function useRealmPanelTransition(position: "left" | "right") {
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)

  const panelStyles = useMemo(
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

  const [panelTransition] = useSpring(() => {
    const destinationStyle = realmPanelVisible
      ? panelStyles.open
      : panelStyles.hidden

    return {
      from: { ...panelStyles.base, ...panelStyles.hidden },
      to: { ...panelStyles.base, ...destinationStyle },
      config: {
        duration: REALM_PANEL_ANIMATION_TIME,
        easing: easings.easeOutCubic,
      },
    }
  }, [realmPanelVisible])

  return panelTransition
}

export function useRealmCloseButtonTransition() {
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)
  const isTablet = useTabletScreen()

  const buttonStyles = useMemo(
    () => ({
      base: { left: isTablet ? "75%" : "50%", transform: "translateX(-50%)" },
      visible: { bottom: 160 },
      hidden: { bottom: -50 },
    }),
    [isTablet]
  )

  const [buttonTransition] = useSpring(() => {
    const destinationButtonStyle = realmPanelVisible
      ? buttonStyles.visible
      : buttonStyles.hidden

    return {
      from: { ...buttonStyles.base, ...buttonStyles.hidden },
      to: { ...buttonStyles.base, ...destinationButtonStyle },
      config: {
        duration: REALM_PANEL_ANIMATION_TIME,
        easing: easings.easeOutCubic,
      },
    }
  }, [realmPanelVisible, isTablet])

  return buttonTransition
}

export function usePanelRealmClose() {
  const dispatch = useDappDispatch()

  const handlePanelClose = useCallback(() => {
    dispatch(setRealmPanelVisible(false))

    const timeout = setTimeout(
      () => dispatch(setDisplayedRealmId(null)),
      REALM_PANEL_ANIMATION_TIME
    )

    return () => clearTimeout(timeout)
  }, [dispatch])

  return handlePanelClose
}

export function useOnRealmClick() {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const dispatch = useDappDispatch()
  // const { updateAssistant, assistantVisible } = useAssistant()

  const { value: visitedRealm, updateStorage: updateVisitedRealm } =
    useLocalStorageChange<boolean>(LOCAL_STORAGE_VISITED_REALM)

  const onRealmClick = useCallback(
    (id: string) => {
      if (!realmId) {
        dispatch(setDisplayedRealmId(String(id)))
        dispatch(setRealmPanelVisible(true))

        // if (assistantVisible("welcome"))
        //   updateAssistant({ visible: false, type: "default" })

        if (!visitedRealm) {
          updateVisitedRealm(true)
          // updateAssistant({ visible: true, type: "first-realm" })
        }
      }
    },
    [
      // assistantVisible,
      dispatch,
      realmId,
      // updateAssistant,
      updateVisitedRealm,
      visitedRealm,
    ]
  )

  return onRealmClick
}
