/* eslint-disable import/prefer-default-export */
import { createSelector } from "@reduxjs/toolkit"
import { selectRealmById } from "./realm"

export const hasNewChallenges = createSelector(selectRealmById, (realmData) =>
  realmData?.challenges.some((challenge) => challenge.isNew)
)

export const selectNewChallengesByRealm = createSelector(
  selectRealmById,
  (realmData) =>
    realmData?.challenges
      ? realmData?.challenges.filter((challenge) => challenge.isNew)
      : []
)
