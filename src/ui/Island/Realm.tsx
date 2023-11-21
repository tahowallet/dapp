/* eslint-disable react/no-array-index-key */
// Need to pass spring props to spring abstracted components
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useRef, useState } from "react"
import type Konva from "konva"
import { Group } from "react-konva"
import { animated, easings, useSpring } from "@react-spring/konva"
import { calculatePartnerLogoTranslate } from "shared/utils"
import {
  REALM_FONT_SIZE,
  REALM_FONT_FAMILY,
  REALM_FONT_STYLE,
} from "shared/constants"
import { useMultiRef } from "shared/hooks"
import { BUBBLE_CONFIG } from "shared/components/RealmCutout/Bubble"
import { selectDisplayedRealmId, useDappSelector } from "redux-state"
import {
  useIslandContext,
  useIslandRealmsPaths,
  usePopulationBubble,
} from "../../shared/hooks"
import NewRealmLabel from "./IslandRealmsDetails/NewRealmLabel"

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
  const realmId = useDappSelector(selectDisplayedRealmId)
  const [isHovered, setIsHovered] = useState(false)
  const [, setIsSelected] = useState(false)

  const islandContext = useIslandContext()
  const groupRef = useRef<Konva.Group>(null)
  const textRef = useRef<Konva.Text>(null)
  const partnerLogoRef = useRef<Konva.Image>(null)
  const bubbleRef = useRef<Konva.Image>(null)

  const [pathRefs, addPathRef] = useMultiRef<Konva.Path>()

  const handleRealmClick = () => {
    setIsSelected((prev) => !prev)
    islandContext.current.onRealmClick(id)
  }

  const partnerLogoTranslate = useMemo(
    () => calculatePartnerLogoTranslate(name),
    [name]
  )

  useIslandRealmsPaths(pathRefs, groupRef, setIsHovered)

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

  const transitionConfig = {
    precision: 0.0001,
    duration: 200,
    easing: easings.easeOutCubic,
  }

  const [pathProps] = useSpring(() => {
    const destinationStyle = isHovered
      ? styles.highlight.pathRealm
      : styles.default.pathRealm

    return {
      from: styles.default.pathRealm,
      to: destinationStyle,
    }
  }, [isHovered])

  const [imageProps] = useSpring(() => {
    const destinationStyle = isHovered
      ? styles.highlight.image
      : styles.default.image

    return {
      from: styles.default.image,
      to: destinationStyle,
    }
  }, [isHovered])

  const [overlayProps] = useSpring(() => {
    // Blinking animation for new realm
    if (isNew) {
      return {
        from: { ...styles.default.overlay, opacity: 0.2 },
        to: { ...styles.default.overlay, opacity: 0.8 },
        loop: { reverse: true },
        config: { duration: 600, easing: easings.easeOutCubic },
      }
    }

    const destinationStyle = isHovered
      ? styles.highlight.overlay
      : styles.default.overlay

    return {
      from: styles.default.overlay,
      to: destinationStyle,
    }
  }, [isHovered])

  const [textProps] = useSpring(() => {
    const destinationStyle = isHovered
      ? styles.highlight.text
      : styles.default.text

    return {
      from: styles.default.text,
      to: destinationStyle,
      config: transitionConfig,
    }
  }, [isHovered])

  const [partnerLogoProps] = useSpring(() => {
    const destinationStyle = isHovered
      ? styles.highlight.partnerLogo
      : styles.default.partnerLogo

    return {
      from: styles.default.partnerLogo,
      to: destinationStyle,
      config: transitionConfig,
    }
  }, [isHovered])

  const { showBubble, setShowBubble } = usePopulationBubble(id)

  const [bubbleProps, set] = useSpring(() => {
    // To prevent lag in animation, let's show only one bubble for the realm.
    // When a modal for the realm is open, do not show a bubble on the map.
    const destinationStyle =
      showBubble && !(realmId === id)
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
  }, [showBubble, realmId, id])

  return (
    <Group ref={groupRef}>
      {imageLayers.map((imageLayer, index) => (
        // @ts-expect-error FIXME: @react-spring-types
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
      {/* This is the "New realm" label */}
      {isNew && <NewRealmLabel realmId={id} x={x} y={y} />}
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
