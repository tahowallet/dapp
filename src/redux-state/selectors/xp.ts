import { createSelector } from "@reduxjs/toolkit"
import { createIslandSelector } from "redux-state/selectors"

export const selectUnclaimedXp = createIslandSelector("unclaimedXp")

export const selectUnclaimedXpById = createSelector(
  [(_, realmId: string) => realmId, selectUnclaimedXp],
  (realmId, unclaimedXp) => unclaimedXp[realmId]
)

export const selectUnclaimedXpSumById = createSelector(
  [selectUnclaimedXpById],
  (unclaimedXp) =>
    unclaimedXp?.reduce((acc, item) => acc + BigInt(item.claim.amount), 0n) ??
    0n
)
