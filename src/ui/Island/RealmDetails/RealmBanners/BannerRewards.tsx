import React, { useCallback, useState } from "react"
import Button from "shared/components/Button"
import RealmBanner from "shared/components/RealmModal/RealmBanner"
import RealmIcon from "shared/components/RealmIcon"
import {
  selectDisplayedRealmId,
  selectRealmById,
  useDappSelector,
} from "redux-state"
import ClaimCongratulations from "ui/Claim/modals/ClaimCongratulations"
import Tooltip from "shared/components/Tooltip"
import { bigIntToDisplayUserAmount } from "shared/utils"
import { LINKS } from "shared/constants"
import { usePostHog } from "posthog-js/react"
import XpClaimModal from "../XpClaim/XpClaimModal"

export default function BannerRewards({
  amount,
  setJustClaimed,
}: {
  amount: bigint
  setJustClaimed: (hasClaimed: boolean) => void
}) {
  const posthog = usePostHog()

  const realmId = useDappSelector(selectDisplayedRealmId)
  const realm = useDappSelector((state) => selectRealmById(state, realmId))

  const parsedAmount = bigIntToDisplayUserAmount(amount)
  const [savedAndParsedAmount] = useState(() => parsedAmount)

  const [congratulationsModalOpen, setCongratulationsModalOpen] =
    useState(false)
  const [isClaimTransactionModalOpen, setIsClaimTransactionModalOpen] =
    useState(false)

  const onClaim = useCallback(() => {
    setJustClaimed(true) // to keep the banner + congratulation modal open
    setCongratulationsModalOpen(true)
    posthog?.capture("Realm XP claim completed", {
      realmName: realm?.name,
    })
  }, [setJustClaimed, realm?.name, posthog])

  const onClose = useCallback(() => {
    setIsClaimTransactionModalOpen(false)
  }, [])

  const onOpen = useCallback(() => {
    posthog?.capture("Realm XP claim started", {
      realmName: realm?.name,
    })
    setIsClaimTransactionModalOpen(true)
  }, [posthog, realm?.name])

  if (!realmId || !realm) return null

  return (
    <>
      <RealmBanner
        label={
          <div className="row_center">
            Claimable rewards
            <Tooltip>
              {/* TODO: Change after beta to:
              You don&apos;t have to claim your XP until end of season, unless
              you plan on trading it. */}
              You don&apos;t have to claim your XP until end of season.{" "}
              {/* TODO: Uncomment after beta:
              <br />
              Exchanging XP for $TAHO only happens at the end of seasons.
              <br /> */}
              <a
                href={LINKS.DOCS}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline" }}
              >
                Read more here.
              </a>
            </Tooltip>
          </div>
        }
        button={
          <Button
            size="medium"
            type="secondary"
            onClick={onOpen}
            isDisabled={amount === 0n}
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
            <div className="token_amount">{parsedAmount}</div>
            <div className="token_name">{realm.xpToken.symbol}</div>
          </div>
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
      <XpClaimModal
        isOpen={isClaimTransactionModalOpen}
        displayAmount={savedAndParsedAmount}
        onClaim={onClaim}
        onClose={onClose}
      />
      {congratulationsModalOpen && (
        <ClaimCongratulations
          realmId={realmId}
          displayAmount={savedAndParsedAmount}
          description={realm.xpToken.symbol}
          close={() => {
            setCongratulationsModalOpen(false)
            setJustClaimed(false)
          }}
        />
      )}
    </>
  )
}
