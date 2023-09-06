import React from "react"
import TahoAmount from "shared/components/TahoAmount"
import Modal from "shared/components/Modal"
import Icon from "shared/components/Icon"
import infoIcon from "shared/assets/icons/m/info.svg"
import Accordion from "shared/components/Accordion"
import { useSelector, selectEligibility } from "redux-state"
import ClaimCheckRules from "../shared/ClaimCheckRules"
import { MapZoneCutout } from "../../Map/MapCutout"
import { getZoneData } from "../../Map/constants"

const MOCK_ZONE = { population: "12,345", ...getZoneData("4") }

export default function ClaimingStats() {
  const eligibility = useSelector(selectEligibility)

  return (
    <Modal.Content>
      <div className="stats column">
        <div className="stats_header">You can claim</div>
        <TahoAmount amount={eligibility?.amount ?? 0n} />
        <Accordion title="Criteria breakdown">
          <ClaimCheckRules type="small" />
        </Accordion>
        <div className="line" />
        <div className="stats_header">Delegate voting power</div>
        <span>-</span>
        <div className="line" />
        <div className="stats_header row">
          Region (Suggested{" "}
          <Icon color="var(--secondary-s1-80)" src={infoIcon} />)
        </div>
        <div className="stats_card column">
          <div className="stats_card_title">{MOCK_ZONE.name}</div>
          <div className="stats_card_label">population</div>
          <div className="stats_card_value">{MOCK_ZONE.population}</div>
          <div className="stats_card_zone">
            <MapZoneCutout zoneId={MOCK_ZONE.id} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .stats {
          padding: 24px;
          gap: 16px;
        }
        .stats_header {
          font-size: 16px;
          color: var(--secondary-s1-60);
          font-weight: 500;
        }
        .stats_header.row {
          align-items: center;
          gap: 4px;
        }
        .line {
          width: 100%;
          height: 1px;
          background: var(--secondary-s1-10);
        }
        .stats_card {
          position: relative;
          border-radius: 4px;
          // TODO: fix gradient - figma is not exoporting it correctly
          background: radial-gradient(
              44.29% 44.29% at 25.3% 74.4%,
              #386b6a 0%,
              rgba(24, 55, 54, 0) 100%
            ),
            radial-gradient(
              46.65% 46.65% at 50% 50%,
              rgba(244, 208, 63, 0.28) 0%,
              rgba(212, 230, 241, 0) 100%
            ),
            linear-gradient(192deg, #082e2c 0%, #183736 100%);
          box-shadow: 0px 10px 12px 0px rgba(6, 49, 47, 0.34),
            0px 14px 16px 0px rgba(6, 49, 47, 0.24),
            0px 24px 24px 0px rgba(6, 49, 47, 0.14);
          padding: 8px 16px;
        }
        .stats_card_title {
          font: var(--text-h1);
          font-size: 24px;
          color: ${MOCK_ZONE.color};
        }
        .stats_card_label {
          color: var(--secondary-s1-60);
          font-size: 16px;
        }
        .stats_card_value {
          font-size: 18px;
          color: var(--secondary-s1-100);
        }
        .stats_card_zone {
          position: absolute;
          right: 0;
          bottom: -20%;
          left: 50%;
        }
      `}</style>
    </Modal.Content>
  )
}
