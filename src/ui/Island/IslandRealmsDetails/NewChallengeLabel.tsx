import React, { useMemo } from "react"
import newChallengeLabelImg from "shared/assets/new-challenge-label.png"
import { FIGMA_FACTOR } from "shared/constants"
import {
  hasNewChallenges,
  selectNewChallengesByRealm,
  useDappSelector,
} from "redux-state"
import { RootState } from "redux-state/reducers"
import { getNewChallengeLabelShift } from "shared/utils"
import { useDisplayedChallenges } from "shared/hooks"
import { Image } from "react-konva"
import useImage from "use-image"

type NewChallengeLabelProps = {
  realmId: string
  x: number
  y: number
}

export default function NewChallengeLabel({
  realmId,
  x,
  y,
}: NewChallengeLabelProps) {
  const newChallengesAvailable = useDappSelector((state: RootState) =>
    hasNewChallenges(state, realmId)
  )

  const newChallengesForRealm = useDappSelector((state: RootState) =>
    selectNewChallengesByRealm(state, realmId)
  )

  const { numberOfNewChallengesDisplayed } = useDisplayedChallenges()

  const allNewChallengesDisplayed = useMemo(
    () =>
      newChallengesForRealm.length === numberOfNewChallengesDisplayed(realmId),
    [newChallengesForRealm.length, numberOfNewChallengesDisplayed, realmId]
  )

  const [newChallengeLabel] = useImage(newChallengeLabelImg)

  if (!newChallengesAvailable || allNewChallengesDisplayed) return null

  const labelShift = getNewChallengeLabelShift(realmId)
  const labelX = x + labelShift.x
  const labelY = y + labelShift.y

  return (
    <Image
      image={newChallengeLabel}
      width={73 * FIGMA_FACTOR.X}
      height={78 * FIGMA_FACTOR.Y}
      x={labelX}
      y={labelY}
      listening={false}
    />
  )
}
