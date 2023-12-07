/* eslint-disable react/no-array-index-key */
// Need to pass spring props to spring abstracted components
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo, useRef, useState } from "react"
import type Konva from "konva"
import { Group } from "react-konva"
import { animated, easings, useSpring } from "@react-spring/konva"
import { calculatePartnerLogoTranslate } from "shared/utils"
import {
  REALM_FONT_SIZE,
  REALM_FONT_FAMILY,
  REALM_FONT_STYLE,
} from "shared/constants"
import {
  useDisplayedRealms,
  useMultiRef,
  useIslandContext,
  useIslandRealmsPaths,
  usePopulationBubble,
} from "shared/hooks"
import { BUBBLE_CONFIG } from "shared/components/Realm/Bubble"
import {
  selectDisplayedRealmId,
  selectRealmPanelVisible,
  useDappSelector,
} from "redux-state"
import NewRealmLabel from "../Details/NewRealmLabel"
import NewChallengeLabel from "../Details/NewChallengeLabel"

type RealmProps = {
  id: string
  imageLayers: HTMLCanvasElement[]
  paths: string[]
  width: number
  color: string
  name: string
  height: number
  x: number
  y: number
  labelX: number
  labelY: number
  partnerLogo: HTMLImageElement
  populationIcon: HTMLImageElement
  isNew?: boolean
}

const transitionConfig = {
  precision: 0.0001,
  duration: 200,
  easing: easings.easeOutCubic,
}

export default function Realm({
  paths,
  width,
  height,
  x,
  y,
  id,
  color,
  name,
  imageLayers,
  labelX,
  labelY,
  partnerLogo,
  populationIcon,
  isNew,
}: RealmProps) {
  const selectedRealmId = useDappSelector(selectDisplayedRealmId)
  const selectedRealmPanelVisible = useDappSelector(selectRealmPanelVisible)
  const [isFocused, setFocus] = useState(false)
  const [, setIsSelected] = useState(false)

  const islandContext = useIslandContext()
  const groupRef = useRef<Konva.Group>(null)
  const textRef = useRef<Konva.Text>(null)
  const partnerLogoRef = useRef<Konva.Image>(null)
  const bubbleRef = useRef<Konva.Image>(null)
  const [pathRefs, addPathRef] = useMultiRef<Konva.Path>()

  const { updateDisplayedRealm, isRealmDisplayed } = useDisplayedRealms()

  const handleRealmClick = useCallback(() => {
    setIsSelected((prev) => !prev)

    updateDisplayedRealm(id)
    islandContext.current.onRealmClick(id)
  }, [updateDisplayedRealm, id, islandContext])

  const partnerLogoTranslate = useMemo(
    () => calculatePartnerLogoTranslate(name),
    [name]
  )

  useIslandRealmsPaths(pathRefs, groupRef, setFocus)

  const styles = useMemo(() => {
    const variants = {
      default: {
        image: {
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowBlur: 40,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          shadowEnabled: true,
        },
        overlay: {
          opacity: 0.5,
          fill: color,
          globalCompositeOperation: "color",
        },
        text: {
          opacity: 0,
          x: x + labelX,
          y: y + labelY + 200,
        },
        pathRealm: { stroke: color, strokeWidth: 8 },
        partnerLogo: {
          opacity: 0,
          x: x + labelX + partnerLogoTranslate,
          y: y + labelY - 20,
        },
        population: {
          opacity: 0,
          x: x + labelX + partnerLogoTranslate,
          y: y + labelY - 20,
        },
      },
      highlight: {
        image: { shadowOpacity: 1 },
        overlay: { opacity: 0.8 },
        text: { opacity: 1, y: y + labelY },
        pathRealm: { strokeWidth: 12 },
        partnerLogo: {
          opacity: 1,
          x: x + labelX + partnerLogoTranslate,
          y: y + labelY - 220,
        },
        population: {
          opacity: 1,
          x: x + labelX + partnerLogoTranslate,
          y: y + labelY - 120,
        },
      },
      finish: {
        population: {
          opacity: 0,
          x: x + labelX + partnerLogoTranslate,
          y: y + labelY - 220,
        },
      },
    }

    return variants
  }, [color, labelX, labelY, x, y, partnerLogoTranslate])

  const [pathProps] = useSpring(() => {
    const destinationStyle =
      isFocused || selectedRealmPanelVisible
        ? styles.highlight.pathRealm
        : styles.default.pathRealm

    return {
      from: styles.default.pathRealm,
      to: destinationStyle,
    }
  }, [isFocused, selectedRealmPanelVisible])

  const [imageProps] = useSpring(() => {
    const destinationStyle =
      isFocused || selectedRealmPanelVisible
        ? styles.highlight.image
        : styles.default.image

    return {
      from: styles.default.image,
      to: destinationStyle,
    }
  }, [isFocused, selectedRealmPanelVisible])

  const [overlayProps] = useSpring(() => {
    const destinationStyle =
      isFocused || selectedRealmPanelVisible
        ? styles.highlight.overlay
        : styles.default.overlay

    return {
      from: styles.default.overlay,
      to: destinationStyle,
    }
  }, [isFocused])

  const [blinkingProps] = useSpring(
    () => ({
      from: { ...styles.default.overlay, opacity: 0.2 },
      to: { ...styles.default.overlay, opacity: 0.8 },
      loop: { reverse: true },
      config: { duration: 600, easing: easings.easeOutCubic },
    }),
    []
  )

  const [textProps] = useSpring(() => {
    const destinationStyle =
      isFocused || selectedRealmPanelVisible
        ? styles.highlight.text
        : styles.default.text

    return {
      from: styles.default.text,
      to: destinationStyle,
      config: transitionConfig,
    }
  }, [isFocused, selectedRealmPanelVisible])

  const [partnerLogoProps] = useSpring(() => {
    const destinationStyle =
      isFocused || selectedRealmPanelVisible
        ? styles.highlight.partnerLogo
        : styles.default.partnerLogo

    return {
      from: styles.default.partnerLogo,
      to: destinationStyle,
      config: transitionConfig,
    }
  }, [isFocused, selectedRealmPanelVisible])

  const { showBubble, setShowBubble } = usePopulationBubble(id)

  const [bubbleProps, set] = useSpring(() => {
    // To prevent lag in animation, let's show only one bubble for the realm.
    // When a modal for the realm is open, do not show a bubble on the map.
    const destinationStyle =
      showBubble && !(selectedRealmId === id)
        ? [styles.highlight.population, styles.finish.population]
        : { opacity: 0 }

    return {
      from: styles.default.population,
      to: destinationStyle,
      config: BUBBLE_CONFIG,
      onRest: () => {
        setShowBubble(false)

        // Restore bubble's initial position after animation has finished
        if (!showBubble) {
          set({ to: styles.default.population })
        }
      },
    }
  }, [showBubble, selectedRealmPanelVisible, id])

  return (
    <Group ref={groupRef}>
      {imageLayers.map((imageLayer, index) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore FIXME: @react-spring-types
        <animated.Image
          key={index}
          listening={false}
          image={imageLayer}
          x={x}
          y={y}
          {...imageProps}
        />
      ))}
      {/* This path is used to create the overlay effect */}
      {paths.map((path, index) => (
        <animated.Path
          key={index}
          x={x}
          y={y}
          data={path}
          width={width}
          height={height}
          listening={false}
          {...overlayProps}
        />
      ))}
      {/* This layer sets stroke and event handlers */}
      {paths.map((path, index) => (
        <animated.Path
          key={index}
          ref={(element) => addPathRef(element, index)}
          x={x}
          y={y}
          data={path}
          width={width}
          height={height}
          onClick={handleRealmClick}
          {...pathProps}
        />
      ))}
      {/* This path is used to create the blinking effect */}
      {isNew && !isRealmDisplayed(id) && (
        <>
          {paths.map((path, index) => (
            <animated.Path
              key={index}
              x={x}
              y={y}
              data={path}
              width={width}
              height={height}
              listening={false}
              onClick={handleRealmClick}
              {...blinkingProps}
            />
          ))}
          <NewRealmLabel realmId={id} x={x} y={y} />
        </>
      )}
      <NewChallengeLabel realmId={id} x={x} y={y} />
      <animated.Text
        ref={textRef}
        text={name ?? "TestRealm"} // TODO: remove conditon when name is accessible
        listening={false}
        fontStyle={REALM_FONT_STYLE}
        fontSize={REALM_FONT_SIZE}
        lineHeight={2}
        fontFamily={REALM_FONT_FAMILY}
        fill="#fff"
        shadowColor="#000"
        shadowOpacity={1}
        shadowBlur={10}
        shadowOffsetX={5}
        shadowOffsetY={5}
        shadowEnabled
        {...textProps}
      />
      {/* This is the partner logo image */}
      <animated.Image
        ref={partnerLogoRef}
        listening={false}
        image={partnerLogo}
        scaleX={3.5}
        scaleY={3.5}
        {...partnerLogoProps}
      />
      {/* This is the population bubble image */}
      <animated.Image
        ref={bubbleRef}
        listening={false}
        image={populationIcon}
        scaleX={1}
        scaleY={1}
        {...bubbleProps}
      />
    </Group>
  )
}
