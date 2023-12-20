import assert from "assert"
import { Stage } from "konva/lib/Stage"
import {
  ISLAND_BOX,
  REALM_FONT_FAMILY,
  REALM_FONT_SIZE,
  REALM_FONT_STYLE,
  REALM_IMAGE_SIZE,
} from "shared/constants"
import { RealmData } from "shared/types"

type Dimensions = {
  width: number
  height: number
}

type RealmRenderData = {
  id: string
  h: number
  w: number
  x: number
  y: number
  paths: { data: string }[]
}

type Coordinates = {
  x: number
  y: number
}

type RealmsData = {
  id: string
} & RealmData

export function limitToBounds(val: number, min: number, max: number) {
  if (val < min) return min
  if (val > max) return max
  return val
}

/**
 * Returns current window innerWidth/innerHeight
 */
export function getWindowDimensions(): Dimensions {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

/**
 *  Returns the minimum scale to fit content inside a container
 */
export function getMinimumScale(content: Dimensions, container: Dimensions) {
  const containerRatio = container.width / container.height
  const contentRatio = content.width / content.height

  // Content wider than container, use height to determine min scale
  if (contentRatio > containerRatio) {
    const minHeight = Math.min(content.height, container.height)
    const maxHeight = Math.max(content.height, container.height)

    return minHeight / maxHeight
  }

  const minWidth = Math.min(content.width, container.width)
  const maxWidth = Math.max(content.width, container.width)
  return minWidth / maxWidth
}

export function createCutoutFromPath(
  realmData: RealmRenderData,
  image: HTMLImageElement
) {
  const { x, y, w, h, paths } = realmData
  const crops: HTMLCanvasElement[] = []

  paths.forEach((path) => {
    const canvas = document.createElement("canvas")

    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext("2d")

    assert(ctx)

    ctx.translate(x, y)
    ctx.clip(new Path2D(path.data))
    ctx.translate(-x, -y)
    ctx.drawImage(image, 0, 0)

    const crop = document.createElement("canvas")
    crop.width = w
    crop.height = h

    const cropCtx = crop.getContext("2d")

    assert(cropCtx)

    cropCtx.drawImage(canvas, -x, -y)

    crops.push(crop)
  })

  return crops
}

export function createBackgroundMask(
  realms: RealmRenderData[],
  bgImage: HTMLImageElement
) {
  const canvas = document.createElement("canvas")
  canvas.width = bgImage.width
  canvas.height = bgImage.height
  const ctx = canvas.getContext("2d")

  assert(ctx)

  realms.forEach(({ x, y, paths }) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.fillStyle = "#000"
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3
    ctx.stroke(new Path2D(paths[0].data))
    ctx.restore()
  })
  ctx.globalCompositeOperation = "source-out"

  ctx.drawImage(bgImage, 0, 0)
  return canvas
}

export function calculateNewIslandScale(
  newValue: number,
  minScale: number
): number {
  const newScale = limitToBounds(newValue, minScale, Math.max(0.45, minScale))
  return newScale
}

export function calculateIslandPosition(
  stage: Stage,
  newScale: number,
  targetX: number,
  targetY: number
): Coordinates {
  const maxX = ISLAND_BOX.width - stage.width() / newScale
  const maxY = ISLAND_BOX.height - stage.height() / newScale

  // Force bounds while zooming in/out
  const newX = limitToBounds(targetX, -maxX * newScale, 0)
  const newY = limitToBounds(targetY, -maxY * newScale, 0)

  return { x: newX, y: newY }
}

export function getCurrentCanvasPosition(
  positionX: number,
  positionY: number,
  zoom: number
): Coordinates {
  const canvasPosition = { x: positionX / zoom, y: positionY / zoom }
  return canvasPosition
}

const POPULATION_ICON_SIZE = 24
const POPULATION_BAR_GAP = 8

export function calculatePopulationIconsPositions(
  width: number,
  realmsData: RealmsData[],
  maxValue: number
) {
  const positions: number[] = []

  realmsData.forEach((realm, index) => {
    const populationShare = realm.displayedPopulation / maxValue
    let iconPosition = Math.max(
      populationShare * width + POPULATION_BAR_GAP,
      POPULATION_BAR_GAP + index * POPULATION_ICON_SIZE
    )

    // Realm with smallest population
    if (index === 0) {
      iconPosition = POPULATION_BAR_GAP
    }

    // Realm with biggest population
    if (realm.displayedPopulation === maxValue) {
      iconPosition = width - (POPULATION_BAR_GAP + POPULATION_ICON_SIZE)
    }

    // Realms have small population difference
    if (iconPosition < positions[index - 1] + POPULATION_ICON_SIZE) {
      iconPosition = positions[index - 1] + POPULATION_ICON_SIZE
    }

    // Setting max position for realms sorted by population
    const MAX_VALUE =
      width -
      ((realmsData.length - index) * POPULATION_ICON_SIZE + POPULATION_BAR_GAP)

    if (iconPosition + POPULATION_ICON_SIZE > MAX_VALUE) {
      iconPosition = MAX_VALUE
    }

    positions[index] = iconPosition
  })

  return positions
}

export function calculatePartnerLogoTranslate(text: string): number {
  const canvas = document.createElement("canvas") as HTMLCanvasElement
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  ctx.font = `${REALM_FONT_STYLE} ${REALM_FONT_SIZE}px ${REALM_FONT_FAMILY}`
  const textWidth = ctx.measureText(text).width

  return textWidth / 2 - REALM_IMAGE_SIZE * 1.7
}
