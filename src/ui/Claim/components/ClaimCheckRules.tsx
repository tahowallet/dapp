import React from "react"
import classNames from "classnames"
import Icon from "shared/components/Media/Icon"
import iconNotifCorrect from "shared/assets/icons/s/notif-correct.svg"
import iconNorifWrong from "shared/assets/icons/s/notif-wrong.svg"
import { separateThousandsByComma } from "shared/utils"
import { Rule } from "../types"

const RULES_MOCK: Rule[] = [
  {
    success: true,
    label: "Signed the pledge before 12/03/2023",
  },
  {
    success: true,
    label: "Participated in NFT",
  },
  {
    success: false,
    label: "Used referral link",
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

export default function ClaimCheckRules({
  rules = RULES_MOCK,
  type = "medium",
}: {
  rules?: Rule[]
  type?: "medium" | "small"
}) {
  return (
    <>
      <ul
        className={classNames("rules_list column", {
          [type]: true,
        })}
      >
        {rules.map(({ success, label = "", amount = 0 }) => (
          <li
            key={label}
            className={classNames("rules_item", {
              fail: !success,
            })}
          >
            <Icon
              src={success ? iconNotifCorrect : iconNorifWrong}
              color={success ? "var(--trading-in)" : undefined}
            />
            {label}
            <div className="rules_amount">
              {success ? separateThousandsByComma(amount) : "0.0"}
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .rules_list {
          width: 478px;
          margin-top: 16px;
          list-style: none;
          padding: 0;
          gap: 16px;
        }
        .rules_list.small {
          width: 270px;
          margin-top: 0;
          font-size: 16px;
        }
        .small .rules_amount {
          font-size: 16px;
        }
        .rules_item {
          display: flex;
          gap: 9px;
          align-items: center;
          width: 100%;
        }
        .rules_item.fail {
          color: var(--secondary-s1-60);
        }
        .rules_amount {
          margin-left: auto;
        }
      `}</style>
    </>
  )
}
