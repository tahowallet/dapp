/* eslint-disable import/prefer-default-export */
import { useCallback } from "react"
import { LOCAL_STORAGE_DISPLAYED_CHALLENGES } from "shared/constants"
import { getRealmIdFromChallengeInLocalStorage } from "shared/utils"
import { useLocalStorageChange } from "./helpers"

export function useDisplayedChallenges(): {
  isChallengeDisplayed: (id: string) => string | false
  updateDisplayedChallenge: (id: string) => void
  numberOfNewChallengesDisplayed: (realmId: string) => number
} {
  const {
    value: displayedChallenges,
    updateStorage: updateDisplayedChallenges,
  } = useLocalStorageChange<{ [key: string]: string[] }>(
    LOCAL_STORAGE_DISPLAYED_CHALLENGES
  )

  const updateDisplayedChallenge = useCallback(
    (id: string) => {
      const realmId = getRealmIdFromChallengeInLocalStorage(id)

      if (displayedChallenges) {
        if (displayedChallenges[realmId]) {
          const updatedChallengeObject = {
            [realmId]: [...new Set([...displayedChallenges[realmId], id])],
          }
          updateDisplayedChallenges({
            ...displayedChallenges,
            ...updatedChallengeObject,
          })
        } else {
          updateDisplayedChallenges({ ...displayedChallenges, [realmId]: [id] })
        }
      } else {
        const displayedChallengesObject = { [realmId]: [id] }
        updateDisplayedChallenges(displayedChallengesObject)
      }
    },
    [displayedChallenges, updateDisplayedChallenges]
  )

  const isChallengeDisplayed = useCallback(
    (id: string) => {
      if (!displayedChallenges) return false

      const realmId = getRealmIdFromChallengeInLocalStorage(id)
      return displayedChallenges[realmId]
        ? displayedChallenges[realmId].find((realm) => realm === id) ?? false
        : false
    },
    [displayedChallenges]
  )

  const numberOfNewChallengesDisplayed = useCallback(
    (realmId: string) =>
      displayedChallenges && displayedChallenges[realmId]
        ? displayedChallenges[realmId].length
        : 0,
    [displayedChallenges]
  )

  return {
    isChallengeDisplayed,
    updateDisplayedChallenge,
    numberOfNewChallengesDisplayed,
  }
}
