export type Dimensions = {
  width: number
  height: number
}

export type RegionRenderData = {
  id: string
  h: number
  w: number
  x: number
  y: number
  paths: { data: string }[]
}
