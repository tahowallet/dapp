import React from "react"
import Button from "shared/components/Button"
import TabPanel from "shared/components/TabPanel"
import walletIcon from "shared/assets/icons/wallet.svg"
import Leaderboard from "./Leaderboard"
import Staking from "./Staking"

export default function ZoneDetails() {
  return (
    <>
      <div className="connect_hint row">
        <p className="connect_hint_label">
          Before joining a region, you need to connect your Taho Wallet
        </p>
        <Button
          iconSrc={walletIcon}
          type="primary"
          size="large"
          iconPosition="left"
        >
          Connect Wallet
        </Button>
      </div>
      <TabPanel
        tabs={[
          {
            label: "Rewards",
            component: null, // TODO: <Rewards />
          },
          { label: "Stake", component: <Staking /> },
          { label: "Leaderboard", component: <Leaderboard /> },
          {
            label: "Council",
            component: null,
            // TODO: <Council />
          },
        ]}
      />
      <style jsx>
        {`
          .connect_hint {
            padding: 36px 24px;
            background-color: var(--primary-p1-40);
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 36px;
            border-radius: 8px;
          }

          .connect_hint_label {
            color: var(--secondary-s1-80);
            max-width: 288px;
          }
        `}
      </style>
    </>
  )
}
