import { createSelector } from "@reduxjs/toolkit"
import { createIslandSelector } from "redux-state/selectors"
import { DisplayedRealmProperty } from "shared/types/selectors"
import { isSameAddress } from "shared/utils"

export const selectRealms = createIslandSelector("realms")
export const selectDisplayedRealmId = createIslandSelector("displayedRealmId")
export const selectRealmPanelVisible = createIslandSelector("realmPanelVisible")

const selectDisplayedRealmProperty: DisplayedRealmProperty = (value) =>
  createSelector(selectRealms, selectDisplayedRealmId, (realms, realmId) =>
    realmId && realms[realmId] ? realms[realmId][value] : undefined
  )

export const selectRealmById = createSelector(
  [selectRealms, (_, realmId: string | null) => realmId],
  (realms, realmId) => (realmId ? realms[realmId] : null)
)

export const selectRealmNameById = createSelector(
  [selectRealms, (_, realmId: string | null) => realmId],
  (realms, realmId) =>
    realmId && realms[realmId] ? realms[realmId].name : "Test"
)

export const selectRealmWithIdByAddress = createSelector(
  [selectRealms, (_, realmAddress: string) => realmAddress],
  (realms, realmAddress) =>
    Object.entries(realms).find(([_, { realmContractAddress }]) =>
      isSameAddress(realmContractAddress, realmAddress)
    )
)

export const selectHasLoadedRealmData = createSelector(
  selectRealms,
  (realms) => Object.keys(realms).length !== 0
)

export const selectDisplayedRealmName = selectDisplayedRealmProperty("name")

export const selectDisplayedRealmAddress = selectDisplayedRealmProperty(
  "realmContractAddress"
)

export const selectDisplayedRealmVeTokenAddress = selectDisplayedRealmProperty(
  "veTokenContractAddress"
)

export const selectNumberOfRealms = createSelector(
  selectRealms,
  (realms) => Object.entries(realms ?? {}).length
)
