import React, { useMemo } from "react"
import newQuestLabel from "shared/assets/new-quest-label.gif"
import { FIGMA_FACTOR } from "shared/constants"
import {
  hasNewQuests,
  selectNewQuestsByRealm,
  useDappSelector,
} from "redux-state"
import { RootState } from "redux-state/reducers"
import { getNewQuestLabelShift } from "shared/utils"
import { useDisplayedQuests } from "shared/hooks"
import Gif from "../Gif"

type NewQuestLabelProps = {
  realmId: string
  x: number
  y: number
}

export default function NewQuestLabel({ realmId, x, y }: NewQuestLabelProps) {
  const newQuestsAvailable = useDappSelector((state: RootState) =>
    hasNewQuests(state, realmId)
  )

  const newQuestsForRealm = useDappSelector((state: RootState) =>
    selectNewQuestsByRealm(state, realmId)
  )

  const { numberOfNewQuestsDisplayed } = useDisplayedQuests()

  const allNewQuestsDisplayed = useMemo(
    () => newQuestsForRealm.length === numberOfNewQuestsDisplayed(realmId),
    [newQuestsForRealm.length, numberOfNewQuestsDisplayed, realmId]
  )

  if (!newQuestsAvailable || allNewQuestsDisplayed) return null

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
