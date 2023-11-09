import { createSelector } from "@reduxjs/toolkit"
import { createIslandSelector, selectWallet } from "redux-state/selectors"
import { UnclaimedXpData } from "shared/types"
import { getClaimXpTransactionID } from "shared/utils"
import { selectTransactionStatusById } from "./wallet"

export const selectUnclaimedXp = createIslandSelector("unclaimedXp")

export const selectUnclaimedXpById = createSelector(
  [(_, realmId: string) => realmId, selectUnclaimedXp],
  (realmId, unclaimedXp) => unclaimedXp[realmId] ?? []
)

export const selectUnclaimedXpSumById = createSelector(
  [selectUnclaimedXpById],
  (unclaimedXp) =>
    unclaimedXp?.reduce((acc, item) => acc + BigInt(item.claim.amount), 0n) ??
    0n
)

// We need to use stable instance of unclaimed drops array to ensure they are not causing
// rerenders while claims transaction modal is visible
export const selectXpClaimTransactionStatuses = createSelector(
  [
    (_, savedUnclaimedDrops: UnclaimedXpData[]) => savedUnclaimedDrops,
    selectWallet,
  ],
  (unclaimedXp, walletState) =>
    Object.fromEntries(
      unclaimedXp.map((data) => {
        const id = getClaimXpTransactionID(data)
        return [id, selectTransactionStatusById({ wallet: walletState }, id)]
      })
    )
)
