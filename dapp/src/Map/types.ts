export type { Stage as KonvaStage } from "konva/lib/Stage"
export type { Node as KonvaNode } from "konva/lib/Node"
export type { Group as KonvaGroup } from "konva/lib/Group"
export type { Layer as KonvaLayer } from "konva/lib/Layer"
export type { Image as KonvaImage } from "konva/lib/shapes/Image"
export type { Rect as KonvaRect } from "konva/lib/shapes/Rect"
export type { Vector2d } from "konva/lib/types"
export type { KonvaEventListener } from "konva/lib/Node"

export type Dimensions = {
  width: number
  height: number
}

export type ZoneRenderData = {
  id: string
  h: number
  w: number
  x: number
  y: number
  path: string
}
