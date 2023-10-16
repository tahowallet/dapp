import { createSelector } from "@reduxjs/toolkit"
import { IslandState } from "redux-state/slices/island"
import { ClaimState } from "./slices/claim"
import { RootState } from "./reducers"
import { WalletState } from "./slices/wallet"

type IslandSelector<K extends keyof IslandState> = (
  state: RootState
) => IslandState[K]

type ClaimSelector<K extends keyof ClaimState> = (
  state: RootState
) => ClaimState[K]

type WalletSelector<K extends keyof WalletState> = (
  state: RootState
) => WalletState[K]

type CreateIslandSelector = <K extends keyof IslandState>(
  value: K
) => IslandSelector<K>

type CreateClaimSelector = <K extends keyof ClaimState>(
  value: K
) => ClaimSelector<K>

type CreateWalletSelector = <K extends keyof WalletState>(
  value: K
) => WalletSelector<K>

export const selectIsland = (state: RootState) => state.island
export const selectClaim = (state: RootState) => state.claim
export const selectWallet = (state: RootState) => state.wallet

export const createIslandSelector: CreateIslandSelector = (value) =>
  createSelector(selectIsland, (island) => island[value])

export const createClaimSelector: CreateClaimSelector = (value) =>
  createSelector(selectClaim, (claim) => claim[value])

export const createWalletSelector: CreateWalletSelector = (value) =>
  createSelector(selectWallet, (wallet) => wallet[value])
