import React from "react"
import classNames from "classnames"
import Icon from "../shared/Icon"
import ClaimHeader from "./ClaimHeader"
import ClaimAmount from "./ClaimAmount"
import iconNorifCorrect from "../shared/assets/icons/s/notif-correct.svg"
import iconNorifWrong from "../shared/assets/icons/s/notif-wrong.svg"
import iconConnected from "../shared/assets/icons/s/connected.svg"
import Button from "../shared/Button"

type Rule = {
  success: boolean
  label: string
  amount?: number
}

const listMock: Rule[] = [
  {
    success: true,
    label: "Signed the pledge before 12/03/2023",
    amount: 140000,
  },
  {
    success: true,
    label: "Participated in NFT",
    amount: 33000,
  },
  {
    success: true,
    label: "Used referral link",
    amount: 21000,
  },
  {
    success: false,
    label: "Joined 9 community calls",
  },
  {
    success: false,
    label: "Bridged to Optimism",
  },
]

export default function ClaimCheckSuccess() {
  return (
    <>
      <div className="success_container">
        <ClaimHeader
          season="Season 1"
          header="Congratulation!"
          subheader={
            <>
              <span style={{ color: "var(--semantic-info)" }}>berrry.eth</span>{" "}
              is eligible to claim:
            </>
          }
        />
        <div className="column_center">
          <ClaimAmount amount={327000} hasBackground size="large" />
          <ul className="rules_list">
            {listMock.map(({ success, label = "", amount = 0 }) => (
              <li
                className={classNames("rules_item", {
                  fail: !success,
                })}
              >
                <Icon
                  src={success ? iconNorifCorrect : iconNorifWrong}
                  color={success ? "var(--trading-in)" : undefined}
                />
                <span>{label}</span>
                <span className="rules_amount">
                  {success ? amount.toLocaleString() : "0.0"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="button_container">
          <Button
            type="primary"
            size="large"
            isDisabled
            iconSrc={iconConnected}
            iconPosition="left"
          >
            Connected
          </Button>
          <Button type="primary" size="large">
            Start claiming process
          </Button>
        </div>
      </div>
      <style jsx>
        {`
          .success_container {
            display: flex;
            flex-direction: column;
            padding: 40px 148px;
            gap: 40px;
          }
          .rules_list {
            margin-top: 16px;
            list-style: none;
            padding: 0;
            width: 100%;
          }
          .rules_item {
            display: flex;
            gap: 9px;
            align-items: center;
            width: 100%;
            margin-bottom: 16px;
          }
          .rules_item.fail {
            color: var(--secondary-s1-60);
          }
          .rules_amount {
            margin-left: auto;
          }
          .button_container {
            margin: 0 -31px;
            display: flex;
            gap: 24px;
          }
          .column_center {
            width: 478px;
          }
        `}
      </style>
    </>
  )
}
