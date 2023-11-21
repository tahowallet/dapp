import React from "react"
import RealmIcon from "shared/components/RealmIcon"
import { WEEKLY_XP_ALLOCATION } from "shared/constants"
import { separateThousandsByComma } from "shared/utils"
import XPCountdown from "./XPCountdown"

export default function QuestsDetails({
  realmId,
  tokenSymbol,
}: {
  realmId: string
  tokenSymbol: string
}) {
  return (
    <div className="content">
      <div className="content_details row_center">
        <XPCountdown />
        <div className="content_details_token column">
          <h1 className="amount row_center">
            <RealmIcon
              realmId={realmId}
              type="circle"
              width="32px"
              color="var(--primary-p1-100)"
            />
            {separateThousandsByComma(
              /* realm?.xpAllocatable || */ WEEKLY_XP_ALLOCATION
            )}
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
      `}</style>
    </div>
  )
}
