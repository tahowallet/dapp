import React from "react"
import Button from "shared/components/Button"
import walletIcon from "shared/assets/icons/wallet.svg"
import iconLight from "shared/assets/icons/m/light.svg"
import Icon from "shared/components/Icon"
import { useConnect } from "shared/hooks"

export default function BannerConnect() {
  const { isConnected, connect } = useConnect()

  if (isConnected) return null

  return (
    <div className="connect_hint row">
      <div className="connect_column column">
        <p className="connect_hint_label">
          Before joining a region, you need to connect your wallet
        </p>
        <div className="connect_hint_sub row_center">
          <Icon src={iconLight} color="var(--primary-p2-100)" width="24px" />
          <span>You can only be staked in one region</span>
        </div>
      </div>
      <Button
        iconSrc={walletIcon}
        type="primary"
        size="large"
        iconPosition="left"
        onClick={() => connect()}
      >
        Connect wallet
      </Button>
      <style jsx>
        {`
          .connect_hint {
            padding: 24px 24px 16px;
            background-color: var(--primary-p1-40);
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 36px;
            border-radius: 8px;
          }
          .connect_hint_sub span {
            color: var(--secondary-s1-70);
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
          }
          .connect_column {
            gap: 8px;
          }
          .connect_hint_label {
            color: var(--secondary-s1-100);
            max-width: 288px;
          }
        `}
      </style>
    </div>
  )
}
