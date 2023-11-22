import React from "react"
import newQuestLabel from "shared/assets/new-quest-label.gif"
import { FIGMA_FACTOR } from "shared/constants"
import { hasNewQuests, useDappSelector } from "redux-state"
import { RootState } from "redux-state/reducers"
import { getNewQuestLabelShift } from "shared/utils"
import Gif from "../Gif"

type NewQuestLabelProps = {
  realmId: string
  x: number
  y: number
}

export default function NewQuestLabel({ realmId, x, y }: NewQuestLabelProps) {
  const newQuestAvailable = useDappSelector((state: RootState) =>
    hasNewQuests(state, realmId)
  )

  if (!newQuestAvailable) return null

  const labelShift = getNewQuestLabelShift(realmId)
  const labelX = x + labelShift.x
  const labelY = y + labelShift.y

  return (
    <Gif
      src={newQuestLabel}
      width={104 * FIGMA_FACTOR.X}
      height={107 * FIGMA_FACTOR.Y}
      x={labelX}
      y={labelY}
    />
  )
}
