import { easings, useSpring } from "@react-spring/web"
import React from "react"
import { animated } from "@react-spring/konva"
import { selectRealmPanelVisible, useDappSelector } from "redux-state"
import { ISLAND_BOX, REALM_PANEL_ANIMATION_TIME } from "shared/constants"

export default function BackgroundOverlay() {
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)

  const [overlayProps] = useSpring(() => {
    const destinationOverlayProps = realmPanelVisible
      ? { opacity: 1 }
      : { opacity: 0 }

    return {
      from: { opacity: 0 },
      to: destinationOverlayProps,
      config: {
        duration: REALM_PANEL_ANIMATION_TIME,
        easing: easings.easeInOutCubic,
      },
    }
  }, [realmPanelVisible])

  return (
    // @ts-expect-error FIXME: @react-spring-types
    <animated.Rect
      fill="#354241"
      width={ISLAND_BOX.width}
      height={ISLAND_BOX.height}
      globalCompositeOperation="color"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...overlayProps}
    />
  )
}
