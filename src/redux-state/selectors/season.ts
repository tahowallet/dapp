import { createSelector } from "@reduxjs/toolkit"
import { createIslandSelector } from "redux-state/selectors"
import { DAY } from "shared/constants"
import { SeasonInfoProperty } from "shared/types/selectors"

export const selectSeasonInfo = createIslandSelector("seasonInfo")

const selectSeasonInfoProperty: SeasonInfoProperty = (value) =>
  createSelector(selectSeasonInfo, (seasonInfo) =>
    seasonInfo ? seasonInfo[value] : undefined
  )

export const selectHasLoadedSeasonInfo = createSelector(
  selectSeasonInfo,
  (seasonInfo) => seasonInfo !== null
)

export const selectSeasonStartTimestamp = selectSeasonInfoProperty(
  "seasonStartTimestamp"
)

export const selectSeasonEndTimestamp =
  selectSeasonInfoProperty("seasonEndTimestamp")

export const selectSeasonDurationInWeeks =
  selectSeasonInfoProperty("durationInWeeks")

export const selectIsEndOfSeason = createSelector(
  selectSeasonEndTimestamp,
  (seasonEndTimestamp) =>
    seasonEndTimestamp ? Date.now() > seasonEndTimestamp : null
)

export const selectSeasonWeek = createSelector(
  selectSeasonStartTimestamp,
  selectIsEndOfSeason,
  selectSeasonDurationInWeeks,
  (seasonStartTimestamp, isEndOfSeason, durationInWeeks) => {
    if (isEndOfSeason) return durationInWeeks

    if (seasonStartTimestamp && durationInWeeks) {
      const hasSeasonStarted = seasonStartTimestamp < Date.now()
      if (!hasSeasonStarted) return 1 // if the start date is placed in the future, set season week to 1

      return Math.trunc((Date.now() - seasonStartTimestamp) / (7 * DAY) + 1)
    }

    return null
  }
)

export const selectWeekStartDate = createSelector(
  selectSeasonStartTimestamp,
  selectSeasonWeek,
  (seasonStartTimestamp, seasonWeek) => {
    if (seasonStartTimestamp && seasonWeek) {
      const startDate = new Date(seasonStartTimestamp)
      startDate.setDate(startDate.getDate() + (seasonWeek - 1) * 7)
      return startDate
    }
    return null
  }
)

export const selectWeekEndDate = createSelector(
  selectWeekStartDate,
  (startDate) => {
    if (!startDate) return null

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 6)
    return endDate
  }
)
