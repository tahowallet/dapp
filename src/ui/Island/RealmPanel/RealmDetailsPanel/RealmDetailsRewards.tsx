import { usePostHog } from "posthog-js/react"
import React, { useCallback, useState } from "react"
import {
  selectDisplayedRealmId,
  selectIsStakingRealmDisplayed,
  selectRealmById,
  selectUnclaimedXpSumById,
  useDappSelector,
} from "redux-state"
import Button from "shared/components/Interface/Button"
import RealmIcon from "ui/Island/Realms/RealmIcon"
import Tooltip from "shared/components/Dialogs/Tooltip"
import { LINKS } from "shared/constants"
import { bigIntToDisplayUserAmount } from "shared/utils"
import ClaimCongratulations from "ui/Claim/modals/ClaimCongratulations"
import XpClaimModal from "ui/Island/Modals/XpClaimModal"
import RealmDetailsChallengeInfo from "./RealmDetailsChallengeInfo"

function RealmDetailsRewards({
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
      <div className="rewards row">
        <div>
          <div className="row_center">
            <span style={{ fontSize: 16, color: "var(--secondary-s1-70" }}>
              Claimable rewards
            </span>
            <Tooltip positionY="top" width="270px">
              You don&apos;t have to claim your XP until end of season.{" "}
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
          <div className="xp_banner column">
            <div className="xp_banner_info row_center">
              <RealmIcon
                realmId={realmId}
                type="circle"
                width="32px"
                color="var(--primary-p1-100)"
              />
              <div className="token_amount">{parsedAmount}</div>
              <div style={{ color: "var(--secondary-s1-70)" }}>XP</div>
            </div>
          </div>
        </div>
        <Button
          size="medium"
          type="secondary"
          onClick={onOpen}
          isDisabled={amount === 0n}
        >
          Claim XP
        </Button>
        {process.env.IS_BETA_CLOSED === "true" && (
          <div style={{ marginTop: "10px" }}>
            <RealmDetailsChallengeInfo>
              Claiming will be live till Jan 28 2024
            </RealmDetailsChallengeInfo>
          </div>
        )}
      </div>
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
      <style jsx>
        {`
          .rewards {
            padding: 20px 32px 32px;
            background-color: var(--primary-p1-40);
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }
          .xp_banner {
            gap: 8px;
          }
          .xp_banner_info {
            gap: 8px;
          }
          .token_amount {
            font-family: var(--serif);
            color: var(--off-white);
            font-size: 32px;
            font-weight: 500;
            line-height: 48px;
            letter-spacing: 0.64px;
          }
        `}
      </style>
    </>
  )
}

export default function RealmDetailsRewardsWrapper({
  realmId,
}: {
  realmId: string
}) {
  const isStakingRealm = useDappSelector(selectIsStakingRealmDisplayed)
  const rewardAmount = useDappSelector((state) =>
    selectUnclaimedXpSumById(state, realmId)
  )
  const [justClaimed, setJustClaimed] = useState(false) // used to keep claim rewards congrats modal open

  if (
    isStakingRealm ||
    (!isStakingRealm && (rewardAmount > 0n || justClaimed))
  ) {
    return (
      <RealmDetailsRewards
        amount={rewardAmount}
        setJustClaimed={setJustClaimed}
      />
    )
  }

  return null
}
