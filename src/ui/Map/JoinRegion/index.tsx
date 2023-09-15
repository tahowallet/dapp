import React from "react"
import Accordion from "shared/components/Accordion"
import Icon from "shared/components/Icon"
import infoIcon from "shared/assets/icons/m/info.svg"
import starIcon from "shared/assets/icons/star.svg"
import RegionIcon from "shared/components/RegionIcon"
import { selectDisplayedRegionId, useDappSelector } from "redux-state"

const EPOCH = {
  number: "1",
  date: "24 OCT - 30 OCT",
}

const REGION_ACTIONS_MOCK = [
  {
    title: "Have at least 0.5 BTC staked in Treshold",
    description:
      "You need to stake at least 0.5 BTC every week in order to receive rewards. You can only receive these rewards for doing this. We are giving this out only to users that have completed this action, this way we make sure that you are aligned with our needs and wants",
  },
  {
    title: "Redeem 0.2 BTC from Treshold",
    description:
      "You need to stake at least 0.5 BTC every week in order to receive rewards. You can only receive these rewards for doing this We are giving this out only to users that have completed this action, this way we make sure that you are aligned with our needs and wants",
  },
]

export default function JoinRegion() {
  const regionId = useDappSelector(selectDisplayedRegionId)

  if (!regionId) return null

  return (
    <div className="region column">
      <div className="details">
        <div className="details_epoch row">
          <div className="column gap">
            Epoch {EPOCH.number}
            <p className="date">{EPOCH.date}</p>
          </div>

          <div className="details_epoch_token column">
            <h1 className="amount">
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

        <div className="details_reward row_center">
          <div className="row_center gap">
            Your current estimated reward:
            <Icon color="var(--secondary-s1-80)" src={infoIcon} />
          </div>
          <div className="amount">
            <RegionIcon
              regionId={regionId}
              type="circle"
              width="24px"
              color="var(--primary-p1-100)"
            />
            20,123
          </div>
        </div>
      </div>

      <div>
        <h3>Receive weekly rewards by doing these actions:</h3>
        <div className="rewards_actions column">
          {REGION_ACTIONS_MOCK.map(({ title, description }) => (
            <Accordion
              key={title}
              title={title}
              icon={starIcon}
              iconColor="var(--semantic-success)"
            >
              <div className="description">{description}</div>
            </Accordion>
          ))}
        </div>
      </div>
      <style jsx>{`
        .region {
          padding-top: 32px;
          gap: 20px;
        }

        .details {
          background-color: var(--primary-p1-100-40);
          border-radius: 8px;
        }

        .details_epoch {
          padding: 24px 24px 0;
          justify-content: space-between;
        }

        .details_epoch_token {
          text-align: right;
          color: var(--secondary-s1-70);
        }

        .details_reward {
          margin-top: 10px;
          padding: 0 24px;
          height: 40px;
          border-radius: 8px;
          justify-content: space-between;
          background: var(--primary-p1-100);
          color: var(--secondary-s1-70);
        }

        .rewards_actions {
          max-width: 650px;
          gap: 16px;
        }
        .description {
          color: var(--secondary-s1-80);
          padding: 0 16px 0px 25px;
        }

        .amount {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--serif);
          color: var(--off-white);
        }

        .date {
          font: var(--text-label);
          color: var(--secondary-s1-70);
        }

        .gap {
          gap: 4px;
        }

        h3 {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  )
}
