import React from "react"
import {
  selectSeasonDurationInWeeks,
  selectSeasonWeek,
  selectWeekEndDate,
  useDappSelector,
} from "redux-state"
import { getNextSelectedWeekDay, getTimeRemaining } from "shared/utils"
import xpBoostIcon from "shared/assets/icons/xp-boost.svg"
import Icon from "shared/components/Media/Icon"

export default function RealmPanelCountdown() {
  const seasonWeek = useDappSelector(selectSeasonWeek)
  const seasonDuration = useDappSelector(selectSeasonDurationInWeeks)
  const weekEndDate = useDappSelector(selectWeekEndDate)

  if (!weekEndDate) return null

  const nextDropTimestamp = getNextSelectedWeekDay(4, 17) // 17:00 UTC time
  const timeRemaining = getTimeRemaining(nextDropTimestamp)

  return (
    <>
      <div className="countdown row">
        <Icon
          type="image"
          src={xpBoostIcon}
          width="125px"
          height="64px"
          style={{ marginTop: "10px" }}
        />
        <div className="column">
          <div className="week">
            Week {seasonWeek}{" "}
            <span style={{ fontSize: 16, color: "var(--secondary-s1-50)" }}>
              / {seasonDuration}
            </span>
          </div>
          <div className="time_remaining">{timeRemaining}</div>
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
