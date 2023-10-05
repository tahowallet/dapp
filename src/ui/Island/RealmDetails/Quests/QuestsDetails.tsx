import React from "react"
import RealmIcon from "shared/components/RealmIcon"

const EPOCH = {
  number: "1",
  date: "24 OCT - 30 OCT",
}

export default function QuestsDetails({
  realmId,
  tokenSymbol,
}: {
  realmId: string
  tokenSymbol: string
}) {
  return (
    <div className="content">
      <div className="content_details row">
        <div className="column gap">
          <div className="row">
            <div className="content_details_weeks">Week {EPOCH.number}</div>
            <span style={{ color: "var(--secondary-s1-70)" }}>/ 12</span>
          </div>
          <div className="content_details_range">{EPOCH.date}</div>
        </div>

        <div className="content_details_token column">
          <h1 className="amount row_center">
            <RealmIcon
              realmId={realmId}
              type="circle"
              width="32px"
              color="var(--primary-p1-100)"
            />
            350,483
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
