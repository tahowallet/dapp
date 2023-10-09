import React from "react"
import {
  selectIsEndOfSeason,
  selectRealmById,
  selectSeasonDurationInWeeks,
  selectSeasonWeek,
  selectWeekEndDate,
  selectWeekStartDate,
  useDappSelector,
} from "redux-state"
import RealmIcon from "shared/components/RealmIcon"
import { bigIntToUserAmount, formatDate } from "shared/utils"

export default function QuestsDetails({
  realmId,
  tokenSymbol,
}: {
  realmId: string
  tokenSymbol: string
}) {
  const startDate = useDappSelector(selectWeekStartDate)
  const endDate = useDappSelector(selectWeekEndDate)
  const seasonWeek = useDappSelector(selectSeasonWeek)
  const duration = useDappSelector(selectSeasonDurationInWeeks)
  const isEndOfSeason = useDappSelector(selectIsEndOfSeason)
  const realm = useDappSelector((state) => selectRealmById(state, realmId))

  return (
    <div className="content">
      <div className="content_details row">
        <div className="column gap">
          <div className="row">
            {!!seasonWeek && (
              <>
                <div className="content_details_weeks">
                  Total real rewards Week {seasonWeek}
                </div>
                <span style={{ color: "var(--secondary-s1-70)" }}>
                  / {duration}
                </span>
              </>
            )}
          </div>
          {startDate && endDate && !isEndOfSeason && (
            <div className="content_details_range">
              {`${formatDate(startDate)}  - ${formatDate(endDate)}`}
            </div>
          )}
        </div>

        <div className="content_details_token column">
          <h1 className="amount row_center">
            <RealmIcon
              realmId={realmId}
              type="circle"
              width="32px"
              color="var(--primary-p1-100)"
            />
            {bigIntToUserAmount(realm?.xpAllocatable ?? 0n)}
          </h1>
          {tokenSymbol}
        </div>
      </div>
      <style jsx>{`
        .content {
          background-color: var(--secondary-s1-10);
          border-radius: 8px;
        }
        .content_details {
          padding: 19px 24px;
          justify-content: space-between;
        }
        .content_details_weeks:after {
          content: " ";
          white-space: pre;
        }
        .content_details_range {
          font: var(--text-label);
          color: var(--secondary-s1-70);
        }

        .content_details_token {
          text-align: right;
          color: var(--secondary-s1-70);
        }
        .amount {
          gap: 8px;
          font-family: var(--serif);
          color: var(--off-white);
          font-weight: 500;
        }
        .gap {
          gap: 4px;
        }
      `}</style>
    </div>
  )
}
