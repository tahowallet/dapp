/* eslint-disable import/prefer-default-export */
import { useCallback } from "react"
import { LOCAL_STORAGE_DISPLAYED_QUESTS } from "shared/constants"
import { getRealmIdFromQuestInLocalStorage } from "shared/utils"
import { useLocalStorageChange } from "./helpers"

export function useDisplayedQuests(): {
  isQuestDisplayed: (id: string) => string | false
  updateDisplayedQuest: (id: string) => void
  numberOfNewQuestsDisplayed: (realmId: string) => number
} {
  const { value: displayedQuests, updateStorage: updateDisplayedQuests } =
    useLocalStorageChange<{ [key: string]: string[] }>(
      LOCAL_STORAGE_DISPLAYED_QUESTS
    )

  const updateDisplayedQuest = useCallback(
    (id: string) => {
      const realmId = getRealmIdFromQuestInLocalStorage(id)

      if (displayedQuests) {
        if (displayedQuests[realmId]) {
          const updatedQuestObject = {
            [realmId]: [...new Set([...displayedQuests[realmId], id])],
          }
          updateDisplayedQuests({ ...displayedQuests, ...updatedQuestObject })
        } else {
          updateDisplayedQuests({ ...displayedQuests, [realmId]: [id] })
        }
      } else {
        const displayedQuestsObject = { [realmId]: [id] }
        updateDisplayedQuests(displayedQuestsObject)
      }
    },
    [displayedQuests, updateDisplayedQuests]
  )

  const isQuestDisplayed = useCallback(
    (id: string) => {
      if (!displayedQuests) return false

      const realmId = getRealmIdFromQuestInLocalStorage(id)
      return displayedQuests[realmId]
        ? displayedQuests[realmId].find((realm) => realm === id) ?? false
        : false
    },
    [displayedQuests]
  )

  const numberOfNewQuestsDisplayed = useCallback(
    (realmId: string) =>
      displayedQuests && displayedQuests[realmId]
        ? displayedQuests[realmId].length
        : 0,
    [displayedQuests]
  )

  return { isQuestDisplayed, updateDisplayedQuest, numberOfNewQuestsDisplayed }
}
