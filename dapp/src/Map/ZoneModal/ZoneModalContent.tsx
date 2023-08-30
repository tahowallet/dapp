import React from "react"

import { MapZoneCutout, MapZoneBackgroundCutout } from "../MapCutout"
import { getZoneData } from "../constants"

import Modal from "../../shared/components/Modal"
import Icon from "../../shared/components/Icon"
import Button from "../../shared/components/Button"
import TabPanel from "../../shared/components/TabPanel"
import Staking from "./Staking"
import Leaderboard from "./Leaderboard"

import iconCommunity from "../../shared/assets/icons/people.svg"
import iconStar from "../../shared/assets/icons/star.svg"
import walletIcon from "../../shared/assets/icons/wallet.svg"

export const mockData = {
  details:
    "KryptoKeep is the meeting place of explorers that have tried out the Keep Network",
  pop: 34_350,
  xpfn: "NFT Collector",
} as const

export default function ZoneModalContent({ zoneId }: { zoneId: string }) {
  const data = { ...mockData, ...getZoneData(zoneId) }

  return (
    <Modal.Content>
      <div className="modal_content">
        <header className="column">
          <div className="zone_header_bg">
            <MapZoneBackgroundCutout zoneId={zoneId} />
          </div>
          <div className="zone_thumb">
            <MapZoneCutout zoneId={zoneId} />
          </div>
          <h1>{data.name}</h1>
          <div className="zone_details_header column">
            <div className="tags row">
              <div className="tag column">
                <span
                  style={{ color: "var(--semantic-info)" }}
                  className="tag_label row"
                >
                  <Icon
                    src={iconCommunity}
                    height="24px"
                    width="24px"
                    color="currentColor"
                  />
                  Population
                </span>
                <span>{data.pop}</span>
              </div>
              <div className="tag column">
                <span
                  style={{ color: "var(--semantic-success)" }}
                  className="tag_label row"
                >
                  <Icon
                    src={iconStar}
                    height="18px"
                    width="18px"
                    color="currentColor"
                  />
                  XP Function
                </span>
                <span>{data.xpfn}</span>
              </div>
            </div>
            <p className="zone_description">{data.details}</p>
          </div>
        </header>
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
            { label: "Stake", component: <Staking zoneId={zoneId} /> },
            { label: "Leaderboard", component: <Leaderboard /> },
            {
              label: "Council",
              component: null,
              // TODO: <Council />
            },
          ]}
        />
      </div>
      <style jsx>
        {`
          .modal_content {
            max-width: 755px;
            padding: 36px 42px;
          }
          header {
            user-select: none;
            margin-bottom: 24px;
            gap: 32px;
          }

          .zone_details_header {
            max-width: 385px;
            gap: 16px;
          }

          .zone_header_bg {
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            border-radius: 16px;
            overflow: hidden;
          }

          .tags {
            gap: 24px;
          }
          .tag_label {
            align-items: center;
            gap: 4px;
          }
          .zone_thumb {
            position: absolute;
            right: 0;
            transform: translateY(-60px) translateX(-24px);
          }

          .zone_description {
            color: var(--secondary-s1-70);
          }

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
    </Modal.Content>
  )
}
