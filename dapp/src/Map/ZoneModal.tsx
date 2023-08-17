import React, { useMemo, useState } from "react"

import {
  useSpring,
  animated,
  easings,
  useTransition as useSpringTransition,
} from "@react-spring/web"
import { MapZoneCutout, MapZoneBackgroundCutout } from "./MapCutout"
import { getZoneData, zones } from "./constants"
import Modal from "../shared/components/Modal"
import Icon from "../shared/components/Icon"
import Button from "../shared/components/Button"
import TabPanel from "../shared/TabPanel"

import iconCommunity from "../shared/assets/icons/people.svg"
import iconStar from "../shared/assets/icons/star.svg"
import walletIcon from "../shared/assets/icons/wallet.svg"

const mockData = {
  details:
    "KryptoKeep is the meeting place of explorers that have tried out the Keep Network",
  pop: 34_350,
  xpfn: "NFT Collector",
} as const

function ZoneModalContent({ zoneId }: { zoneId: string }) {
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
        <TabPanel tabs={["Rewards", "Stake", "Leaderboard", "Council"]} />
        <span>#{zoneId}</span>
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

function PrevBtn({ onClick, style }: React.SVGProps<SVGSVGElement>) {
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

function NextBtn({ onClick, style }: React.SVGProps<SVGSVGElement>) {
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

export default function ZoneModal({
  zoneData,
  onClose,
}: {
  zoneData: string
  onClose: () => void
}) {
  const [zoneId, setZoneId] = useState(zoneData)
  const [prevZone, nextZone] = useMemo(() => {
    const index = zones.findIndex((zone) => zone.id === zoneId)

    const prev =
      index - 1 < 0 ? zones[zones.length - 1].id : zones[index - 1].id
    const next = index + 1 === zones.length ? zones[0].id : zones[index + 1].id
    return [prev, next]
  }, [zoneId])

  const [props] = useSpring(
    () => ({
      from: {
        transform: "translate3d(0,38.5%,0) scale(0.8)",
        opacity: 0,
      },
      to: {
        transform: "translate3d(0,0,0) scale(1)",
        opacity: 1,
        position: "relative",
      },
      config: { duration: 300, easing: easings.easeInOutCubic },
    }),
    []
  )

  const transitions = useSpringTransition(zoneId, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
    config: { duration: 200, easing: easings.easeOutQuad },
  })

  return (
    <Modal.Container type="fullscreen" onClickOutside={onClose}>
      <animated.div style={{ position: "relative" }}>
        <PrevBtn
          style={{
            position: "absolute",
            top: "68px",
            left: -80,
            zIndex: 1,
            transform: "translateX(-100%)",
          }}
          onClick={() => setZoneId(prevZone)}
        />
        <NextBtn
          style={{
            position: "absolute",
            top: "68px",
            right: -80,
            zIndex: 1,
            transform: "translateX(100%)",
          }}
          onClick={() => setZoneId(nextZone)}
        />
        <animated.div style={props}>
          {transitions((style, item) => (
            <animated.div style={{ ...style }}>
              <ZoneModalContent zoneId={item} />
            </animated.div>
          ))}
        </animated.div>
      </animated.div>
    </Modal.Container>
  )
}
