import classNames from "classnames"
import React from "react"
import lockIcon from "shared/assets/icons/s/lock.svg"
import coinIcon from "shared/assets/taho-coin.svg"
import { parseTahoAmount, separateThousandsByComma } from "../../utils"
import Icon from "../Media/Icon"

type TahoAmountProps = {
  amount?: bigint
  hasBackground?: boolean
  size?: "small" | "large"
  width?: string
}

export default function TahoAmount({
  amount = 0n,
  hasBackground = false,
  size = "small",
  width = "432px",
}: TahoAmountProps) {
  return (
    <>
      <div
        className={classNames("amount_container", {
          small: size === "small",
          background: hasBackground,
        })}
      >
        <div className="taho_coin" />
        <span className="amount_value">
          {separateThousandsByComma(parseTahoAmount(amount))}
        </span>
        <span>TAHO</span>
        <Icon src={lockIcon} color="var(--semantic-attention)" />
      </div>
      <style jsx>
        {`
          .amount_container {
            display: flex;
            flex: 1 0 auto;
            min-width: 0;
            width: ${width};
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
            text-align: right;
            flex-grow: 1;
          }
          .small {
            width: 100%;
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
