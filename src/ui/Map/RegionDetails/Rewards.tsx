import React from "react"
import { selectDisplayedRegionId, useDappSelector } from "redux-state"
import Accordion from "shared/components/Accordion"
import Icon from "shared/components/Icon"
import contactsIcon from "shared/assets/icons/m/contacts.svg"
import starIcon from "shared/assets/icons/star.svg"
import RegionIcon from "shared/components/RegionIcon"

const EPOCH = {
  number: "1",
  date: "24 OCT - 30 OCT",
}

const REGION_ACTIONS_MOCK = [
  {
    title: "Have at least 0.5 BTC staked in Treshold (Repeatable)",
    description:
      "You need to stake at least 0.5 BTC every week in order to receive rewards. You can only receive these rewards for doing this. We are giving this out only to users that have completed this action, this way we make sure that you are aligned with our needs and wants",
  },
  {
    title: "Have at least 0.5 BTC staked in Treshold (Only once)",
    description:
      "You need to stake at least 0.5 BTC every week in order to receive rewards. You can only receive these rewards for doing this We are giving this out only to users that have completed this action, this way we make sure that you are aligned with our needs and wants",
  },
]

function RewardsDetails({ regionId }: { regionId: string }) {
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
            <RegionIcon
              regionId={regionId}
              type="circle"
              width="32px"
              color="var(--primary-p1-100)"
            />
            350,483
          </h1>
          TAHO-XP-01
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

function RewardsActions() {
  return (
    <div>
      <h3 className="header row">
        Your weekly action needed to receive rewards
        <div className="header_icon row_center">
          <Icon
            color="var(--secondary-s1-60)"
            src={contactsIcon}
            width="18px"
          />
          Rulebook
        </div>
      </h3>
      <div className="rewards_actions column">
        {REGION_ACTIONS_MOCK.map(({ title, description }) => (
          <Accordion
            key={title}
            title={title}
            icon={starIcon}
            iconColor="var(--semantic-success)"
            type="frame"
          >
            <div className="rewards_actions_description">{description}</div>
          </Accordion>
        ))}
      </div>
      <style jsx>{`
        .header {
          margin-bottom: 8px;
          justify-content: space-between;
        }
        .header_icon {
          color: var(--secondary-s1-60);
          font: var(--text-label);
          gap: 8px;
        }
        .rewards_actions {
          gap: 20px;
        }
        .rewards_actions_description {
          color: var(--secondary-s1-80);
          padding: 0 16px 0px 25px;
        }
      `}</style>
    </div>
  )
}

export default function Rewards() {
  const regionId = useDappSelector(selectDisplayedRegionId)

  if (!regionId) return null

  return (
    <div className="region column">
      <RewardsDetails regionId={regionId} />
      <RewardsActions />
      <style jsx>{`
        .region {
          padding-top: 32px;
          gap: 22px;
        }
      `}</style>
    </div>
  )
}
