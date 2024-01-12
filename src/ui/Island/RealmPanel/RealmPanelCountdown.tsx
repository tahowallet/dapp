import React from "react"
import {
  // selectSeasonDurationInWeeks,
  selectSeasonWeek,
  selectWeekEndDate,
  useDappSelector,
} from "redux-state"
import Icon from "shared/components/Media/Icon"
import { getNextSelectedWeekDay, getTimeRemaining } from "shared/utils"
import xpBoostIcon from "shared/assets/icons/xp-boost.svg"

export default function RealmPanelCountdown() {
  const seasonWeek = useDappSelector(selectSeasonWeek)
  // TODO: for now we are hardcoding the season duration to 7 weeks to get better UX
  const seasonDuration = 7 // useDappSelector(selectSeasonDurationInWeeks)
  const weekEndDate = useDappSelector(selectWeekEndDate)

  if (!weekEndDate) return null

  const nextDropTimestamp = getNextSelectedWeekDay(4, 17) // 17:00 UTC time
  const timeRemaining = getTimeRemaining(nextDropTimestamp)

  return (
    <>
      <div className="countdown row">
        {process.env.IS_BETA_CLOSED === "true" || (
          <Icon
            type="image"
            src={xpBoostIcon}
            width="125px"
            height="64px"
            style={{ marginTop: "10px" }}
          />
        )}
        <div className="column">
          <div className="week">
            Week{" "}
            {process.env.IS_BETA_CLOSED === "true"
              ? seasonDuration
              : seasonWeek}{" "}
            <span style={{ fontSize: 16, color: "var(--secondary-s1-50)" }}>
              / {seasonDuration}
            </span>
          </div>

          <div className="time_remaining">
            {process.env.IS_BETA_CLOSED === "true"
              ? "Beta is over, claim XP till Jan 28 2024"
              : timeRemaining}
          </div>
        </div>
      </div>
      <style jsx>{`
        .countdown {
          position: absolute;
          text-align: right;
          top: 104px;
          right: 32px;
        }
        .week {
          font-size: 16px;
          color: var(--secondary-s1-80);
        }
        .time_remaining {
          font-size: 20px;
          font-weight: 400;
          line-height: 32px;
        }
      `}</style>
    </>
  )
}
