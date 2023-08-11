import classNames from "classnames"
import React from "react"
import Icon from "@components/Icon"
import lockIcon from "@assets/icons/s/lock.svg"
import coinIcon from "@assets/taho-coin.svg"

type ClaimAmountProps = {
  amount: number
  hasBackground?: boolean
  size?: "small" | "large"
}

export default function ClaimAmount({
  amount = 0,
  hasBackground = false,
  size = "small",
}: ClaimAmountProps) {
  return (
    <>
      <div
        className={classNames("amount_container", {
          small: size === "small",
          background: hasBackground,
        })}
      >
        <div className="taho_coin" />
        <span className="amount_value">{amount.toLocaleString()}</span>
        <span>TAHO</span>
        <Icon src={lockIcon} color="var(--semantic-attention)" />
      </div>
      <style jsx>
        {`
          .amount_container {
            display: flex;
            flex: 1 0 auto;
            min-width: 0;
            align-items: center;
            letter-spacing: 1px;
            color: var(--secondary-s1-100);
          }
          .amount_container.background {
            padding: 24px;
            flex-shrink: 0;
            border-radius: 88px;
            background: var(--primary-p1-100);
          }
          .amount_value {
            font-family: "QuincyCF";
            font-size: 52px;
            line-height: 42px;
            margin: 0 11px 0 35px;
          }
          .small .amount_value {
            font-size: 42px;
            margin: 0 8px 0 31px;
          }
          .taho_coin {
            width: 74px;
            height: 74px;
            flex-shrink: 0;
            flex-grow: 0;
            background-image: url(${coinIcon});
            background-size: cover;
          }
          .small .taho_coin {
            width: 48px;
            height: 48px;
          }
        `}
      </style>
    </>
  )
}
