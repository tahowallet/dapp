import React from "react"
import Button from "shared/components/Button"
import Icon from "shared/components/Icon"
import RegionBanner from "shared/components/RegionModal/RegionBanner"
import infoIcon from "shared/assets/icons/m/info.svg"
import RegionIcon from "shared/components/RegionIcon"
import {
  selectIsStakingRegionDisplayed,
  selectDisplayedRegionId,
  useDappSelector,
} from "redux-state"

// TODO: use a correct data
const MOCKED_XP = {
  amount: 20.123,
  name: "TAHO-XP-01",
  latestAmount: 12.237,
  weeks: 2,
}

export default function BannerRewards() {
  const regionId = useDappSelector(selectDisplayedRegionId)
  const isStakingRegion = useDappSelector(selectIsStakingRegionDisplayed)
  const rewardAmount = MOCKED_XP.amount ?? 0

  // TODO: add a function body
  const handleClaimXP = () => {}

  if (!regionId || (!isStakingRegion && rewardAmount === 0)) return null

  return (
    <RegionBanner
      label={
        <div className="label row">
          Claimable rewards
          {/* TODO: change to tooltip component */}
          <Icon color="var(--secondary-s1-80)" src={infoIcon} />
        </div>
      }
      button={
        <Button
          size="medium"
          type="secondary"
          onClick={handleClaimXP}
          isDisabled={rewardAmount === 0}
        >
          Claim XP
        </Button>
      }
    >
      <div className="xp_banner column">
        <div className="xp_banner_info row_center">
          <RegionIcon
            regionId={regionId}
            type="circle"
            width="32px"
            color="var(--primary-p1-100)"
          />
          <div className="token_amount">{rewardAmount}</div>
          <div className="token_name">{MOCKED_XP.name}</div>
        </div>
        {rewardAmount !== 0 && (
          <div className="xp_banner_date">
            Latest: {MOCKED_XP.latestAmount} XP (week {MOCKED_XP.weeks}/12)
          </div>
        )}
      </div>
      <style jsx>
        {`
          .label {
            gap: 8px;
            align-items: center;
          }
          .xp_banner {
            gap: 8px;
          }
          .xp_banner_info {
            gap: 8px;
          }
          .xp_banner_date {
            font: var(--text-label);
            color: var(--secondary-s1-50);
          }
          .token_amount {
            font-family: var(--serif);
            color: var(--off-white);
            font-size: 32px;
            font-weight: 500;
            line-height: 48px;
            letter-spacing: 0.64px;
          }
          .token_name {
            color: var(--secondary-s1-70);
          }
        `}
      </style>
    </RegionBanner>
  )
}
