import React from "react"
import {
  selectSeasonDurationInWeeks,
  selectSeasonWeek,
  selectWeekEndDate,
  useDappSelector,
} from "redux-state"
import { getTimeRemaining } from "shared/utils"

export default function XPCountdown() {
  const weekEndDate = useDappSelector(selectWeekEndDate)
  const seasonWeek = useDappSelector(selectSeasonWeek)
  const seasonDuration = useDappSelector(selectSeasonDurationInWeeks)

  if (!weekEndDate) return null

  const timeRemaining = getTimeRemaining(weekEndDate)

  return (
    <>
      <div className="column gap">
        <div>{timeRemaining}</div>
        {seasonWeek && seasonDuration && (
          <div className="week_container row gap">
            <span>Week {seasonWeek}</span>
            <span style={{ color: "var(--secondary-s1-50)" }}>
              / {seasonDuration}
            </span>
          </div>
        )}
      </div>
      <style jsx>{`
        .week_container {
          color: var(--secondary-s1-80);
        }
        .week_container span {
          font-size: 16px;
        }
        .gap {
          gap: 4px;
        }
      `}</style>
    </>
  )
}
