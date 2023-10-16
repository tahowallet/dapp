import { createSelector } from "@reduxjs/toolkit"
import {
  CreateIslandSelector,
  CreateClaimSelector,
  CreateWalletSelector,
} from "shared/types/selectors"
import { RootState } from "./reducers"

export const selectIsland = (state: RootState) => state.island
export const selectClaim = (state: RootState) => state.claim
export const selectWallet = (state: RootState) => state.wallet

export const createIslandSelector: CreateIslandSelector = (value) =>
  createSelector(selectIsland, (island) => island[value])

export const createClaimSelector: CreateClaimSelector = (value) =>
  createSelector(selectClaim, (claim) => claim[value])

export const createWalletSelector: CreateWalletSelector = (value) =>
  createSelector(selectWallet, (wallet) => wallet[value])
