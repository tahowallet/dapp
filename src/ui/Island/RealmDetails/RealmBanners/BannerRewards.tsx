import React, { useState } from "react"
import Button from "shared/components/Button"
import RealmBanner from "shared/components/RealmModal/RealmBanner"
import RealmIcon from "shared/components/RealmIcon"
import { selectDisplayedRealmId, useDappSelector } from "redux-state"
import ClaimCongratulations from "ui/Claim/modals/ClaimCongratulations"
import Tooltip from "shared/components/Tooltip"

// TODO: use a correct data
const MOCKED_XP = {
  name: "TAHO-XP-01",
  latestAmount: 12.237,
  weeks: 2,
}

export default function BannerRewards({ amount }: { amount: number }) {
  const realmId = useDappSelector(selectDisplayedRealmId)

  const [congratulationsModalOpen, setCongratulationsModalOpen] =
    useState(false)

  const handleClaimXP = () => {
    // TODO: add transaction signing window
    setCongratulationsModalOpen(true)
  }

  if (!realmId) return null

  return (
    <>
      <RealmBanner
        label={
          <div className="row_center">
            Claimable rewards
            <Tooltip>
              You don&apos;t have to claim your XP until end of season. Unless
              you plan on trading it.
              <br />
              Exchanging XP for $TAHO only happens at the end of seasons.
              <br />
              <a
                href="/"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                Read more here
              </a>
            </Tooltip>
          </div>
        }
        button={
          <Button
            size="medium"
            type="secondary"
            onClick={handleClaimXP}
            isDisabled={amount === 0}
          >
            Claim XP
          </Button>
        }
      >
        <div className="xp_banner column">
          <div className="xp_banner_info row_center">
            <RealmIcon
              realmId={realmId}
              type="circle"
              width="32px"
              color="var(--primary-p1-100)"
            />
            <div className="token_amount">{amount}</div>
            <div className="token_name">{MOCKED_XP.name}</div>
          </div>
          {amount !== 0 && (
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
      </RealmBanner>
      {congratulationsModalOpen && (
        <ClaimCongratulations
          realmId={realmId}
          amount={amount}
          description={MOCKED_XP.name}
          close={() => setCongratulationsModalOpen(false)}
        />
      )}
    </>
  )
}
