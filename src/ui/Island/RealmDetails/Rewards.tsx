import React from "react"
import {
  selectDisplayedRealmId,
  selectRealmById,
  selectWeekStartDate,
  selectSeasonWeek,
  useDappSelector,
  selectWeekEndDate,
} from "redux-state"
import Accordion from "shared/components/Accordion"
import Icon from "shared/components/Icon"
import contactsIcon from "shared/assets/icons/m/contacts.svg"
import starIcon from "shared/assets/icons/star.svg"
import RealmIcon from "shared/components/RealmIcon"
import { printData } from "shared/utils"

function RewardsDetails({
  realmId,
  tokenSymbol,
}: {
  realmId: string
  tokenSymbol: string
}) {
  const startDate = useDappSelector(selectWeekStartDate)
  const endDate = useDappSelector(selectWeekEndDate)
  const seasonWeek = useDappSelector(selectSeasonWeek)

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
                <span style={{ color: "var(--secondary-s1-70)" }}>/ 12</span>
              </>
            )}
          </div>
          {startDate && endDate && (
            <div className="content_details_range">
              {`${printData(startDate)}  - ${printData(endDate)}`}
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

function RewardsQuests({
  quests,
}: {
  quests: { name: string; description: string }[]
}) {
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
      <div className="rewards_quests column">
        {quests.map(({ name, description }) => (
          <Accordion
            key={name}
            title={name}
            icon={starIcon}
            iconColor="var(--semantic-success)"
            type="frame"
          >
            <div className="rewards_quests_description">{description}</div>
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
        .rewards_quests {
          gap: 20px;
        }
        .rewards_quests_description {
          color: var(--secondary-s1-80);
          padding: 0 16px 0px 25px;
        }
      `}</style>
    </div>
  )
}

export default function Rewards() {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realm = useDappSelector((state) => selectRealmById(state, realmId))

  if (!realmId || !realm) return null

  return (
    <div className="realm column">
      <RewardsDetails
        realmId={realmId}
        tokenSymbol={realm.xpTokenSymbolPrefix}
      />
      <RewardsQuests quests={realm.quests} />
      <style jsx>{`
        .realm {
          padding-top: 32px;
          gap: 22px;
        }
      `}</style>
    </div>
  )
}
