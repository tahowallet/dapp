import React, { useMemo } from "react"
import newQuestLabelImg from "shared/assets/new-quest-label.png"
import { FIGMA_FACTOR } from "shared/constants"
import {
  hasNewQuests,
  selectNewQuestsByRealm,
  useDappSelector,
} from "redux-state"
import { RootState } from "redux-state/reducers"
import { getNewQuestLabelShift } from "shared/utils"
import { useDisplayedQuests } from "shared/hooks"
import { Image } from "react-konva"
import useImage from "use-image"

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

  const [newQuestLabel] = useImage(newQuestLabelImg)

  if (!newQuestsAvailable || allNewQuestsDisplayed) return null

  const labelShift = getNewQuestLabelShift(realmId)
  const labelX = x + labelShift.x
  const labelY = y + labelShift.y

  return (
    <Image
      image={newQuestLabel}
      width={73 * FIGMA_FACTOR.X}
      height={78 * FIGMA_FACTOR.Y}
      x={labelX}
      y={labelY}
      listening={false}
    />
  )
}
