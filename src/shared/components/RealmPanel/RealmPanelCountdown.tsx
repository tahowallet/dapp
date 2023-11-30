import { animated } from "@react-spring/web"
import React from "react"
import {
  selectSeasonDurationInWeeks,
  selectSeasonWeek,
  selectWeekEndDate,
  useDappSelector,
} from "redux-state"
import { useRealmPanelCountdownTransition } from "shared/hooks"
import { getNextSelectedWeekDay, getTimeRemaining } from "shared/utils"

export default function RealmPanelCountdown() {
  const seasonWeek = useDappSelector(selectSeasonWeek)
  const seasonDuration = useDappSelector(selectSeasonDurationInWeeks)
  const weekEndDate = useDappSelector(selectWeekEndDate)

  const countdownTransition = useRealmPanelCountdownTransition()

  if (!weekEndDate) return null

  const nextDropTimestamp = getNextSelectedWeekDay(4, 18)
  const timeRemaining = getTimeRemaining(nextDropTimestamp)

  return (
    <>
      <animated.div
        style={{
          ...countdownTransition,
          position: "absolute",
          textAlign: "right",
        }}
      >
        <div className="week">
          Week {seasonWeek}{" "}
          <span style={{ fontSize: 16, color: "var(--secondary-s1-50)" }}>
            / {seasonDuration}
          </span>
        </div>
        <div className="time_remaining">{timeRemaining}</div>
      </animated.div>
      <style jsx>{`
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
