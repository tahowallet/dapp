import React from "react"

import { MapZoneCutout, MapZoneBackgroundCutout } from "./MapCutout"
import { getZoneData } from "./constants"
import Modal from "../shared/components/Modal"
import Icon from "../shared/components/Icon"
import Button from "../shared/components/Button"
import TabPanel from "../shared/TabPanel"

import iconCommunity from "../shared/assets/icons/people.svg"
import iconStar from "../shared/assets/icons/star.svg"
import walletIcon from "../shared/assets/icons/wallet.svg"

function PrevBtnIcon({
  onClick,
  style = {},
}: {
  onClick?: () => void
  style: React.CSSProperties
}) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={style}
    >
      <rect
        x={80}
        y={80}
        width={80}
        height={80}
        rx={40}
        transform="rotate(-180 80 80)"
        fill="#E4EEEE"
        fillOpacity={0.1}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.067 29.933l-8.014 8.015a2.667 2.667 0 000 3.77l8.062 8.063.01.01 1.415-1.414-.011-.01L32.162 41h18.505v-2H31.829l7.652-7.653-1.414-1.414z"
        fill="currentColor"
        fillOpacity="var(--fill-opacity)"
      />
      <rect
        className="circle_stroke"
        x={79.5}
        y={79.5}
        width={79}
        height={79}
        rx={39.5}
        transform="rotate(-180 79.5 79.5)"
        stroke="currentColor"
        strokeOpacity="var(--stroke-opacity)"
      />
      <style jsx>
        {`
          svg {
            color: #e4eeee;
            --fill-opacity: 0.5;
            --stroke-opacity: 0.3;
          }
          svg * {
            transition: all 0.3s ease-out;
          }

          svg:hover {
            cursor: pointer;
            color: var(--semantic-success);
            --fill-opacity: 1;
            --stroke-opacity: 1;
          }
        `}
      </style>
    </svg>
  )
}

function NextBtnIcon({
  onClick,
  style = {},
}: {
  onClick?: () => void
  style: React.CSSProperties
}) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={style}
    >
      <rect width={80} height={80} rx={40} fill="#E4EEEE" fillOpacity={0.1} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.933 50.067l8.014-8.015a2.667 2.667 0 000-3.77l-8.062-8.063-.01-.01-1.415 1.414.011.01L47.838 39H29.333v2h18.838l-7.652 7.653 1.414 1.414z"
        fill="currentColor"
        fillOpacity="var(--fill-opacity)"
      />
      <rect
        x={0.5}
        y={0.5}
        width={79}
        height={79}
        rx={39.5}
        stroke="currentColor"
        strokeOpacity="var(--stroke-opacity)"
      />
      <style jsx>
        {`
          svg {
            color: #e4eeee;
            --fill-opacity: 0.5;
            --stroke-opacity: 0.3;
          }
          svg * {
            transition: all 0.3s ease-out;
          }

          svg:hover {
            cursor: pointer;
            color: var(--semantic-success);
            --fill-opacity: 1;
            --stroke-opacity: 1;
          }
        `}
      </style>
    </svg>
  )
}

const mockData = {
  details:
    "KryptoKeep is the meeting place of explorers that have tried out the Keep Network",
  pop: 34_350,
  xpfn: "NFT Collector",
} as const

export default function ZoneModal({
  zoneData: zoneId,
  onClose,
  onNext,
  onPrev,
}: {
  zoneData: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const data = { ...mockData, ...getZoneData(zoneId) }

  return (
    <>
      <Modal.Container type="fullscreen" onClickOutside={onClose}>
        <Modal.Content>
          <PrevBtnIcon
            style={{
              position: "absolute",
              top: "68px",
              left: -80,
              zIndex: 1,
              transform: "translateX(-100%)",
            }}
            onClick={onPrev}
          />
          <NextBtnIcon
            style={{
              position: "absolute",
              top: "68px",
              right: -80,
              zIndex: 1,
              transform: "translateX(100%)",
            }}
            onClick={onNext}
          />
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
            <TabPanel tabs={["Rewards", "Stake", "Leaderboard", "Council"]} />
            <span>#{zoneId}</span>
          </div>
        </Modal.Content>
      </Modal.Container>
      <style jsx>{`
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
        header {
          user-select: none;
          margin-bottom: 24px;
          gap: 32px;
        }
        .tags {
          gap: 24px;
        }
        .zone_description {
          color: var(--secondary-s1-70);
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

        .modal_content {
          max-width: 755px;
          padding: 36px 42px;
        }

        .modal_overlay {
          background: var(--primary-p1-100);
          inset: 0;
          position: absolute;
          z-index: 1;
          opacity: 0;
          animation: toggleOverlay 0.3s ease-out forwards;
        }

        @keyframes toggleOverlay {
          from {
            opacity: 0;
          }

          to {
            opacity: 0.8;
          }
        }
      `}</style>
    </>
  )
}
