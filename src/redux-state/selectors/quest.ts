/* eslint-disable import/prefer-default-export */
import { createSelector } from "@reduxjs/toolkit"
import { selectRealmById } from "./realm"

export const hasNewQuests = createSelector(selectRealmById, (realmData) =>
  realmData?.quests.some((quest) => quest.isNew)
)
