import assert from "assert"

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
