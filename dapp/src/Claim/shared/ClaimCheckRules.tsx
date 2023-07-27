import React from "react"
import classNames from "classnames"
import Icon from "../../shared/Icon"
import { Rule } from "../types"
import iconNotifCorrect from "../../shared/assets/icons/s/notif-correct.svg"
import iconNorifWrong from "../../shared/assets/icons/s/notif-wrong.svg"

export default function ClaimCheckRules({ rules = [] }: { rules: Rule[] }) {
  return (
    <>
      <ul className="rules_list">
        {rules.map(({ success, label = "", amount = 0 }) => (
          <li
            className={classNames("rules_item", {
              fail: !success,
            })}
          >
            <Icon
              src={success ? iconNotifCorrect : iconNorifWrong}
              color={success ? "var(--trading-in)" : undefined}
            />
            <span>{label}</span>
            <span className="rules_amount">
              {success ? amount.toLocaleString() : "0.0"}
            </span>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .rules_list {
          width: 478px;
          margin-top: 16px;
          list-style: none;
          padding: 0;
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
      `}</style>
    </>
  )
}
