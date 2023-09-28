import assert from "assert"
import { Stage } from "konva/lib/Stage"
import { ISLAND_BOX } from "shared/constants"

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
  const path = paths[0].data

  const canvas = document.createElement("canvas")

  canvas.width = image.width
  canvas.height = image.height

  const ctx = canvas.getContext("2d")

  assert(ctx)

  ctx.translate(x, y)
  ctx.clip(new Path2D(path))
  ctx.translate(-x, -y)
  ctx.drawImage(image, 0, 0)

  const crop = document.createElement("canvas")
  crop.width = w
  crop.height = h

  const cropCtx = crop.getContext("2d")

  assert(cropCtx)

  cropCtx.drawImage(canvas, -x, -y)

  return crop
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
    ctx.fill(new Path2D(paths[0].data))
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
