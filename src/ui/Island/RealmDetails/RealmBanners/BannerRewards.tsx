import React, { useCallback, useEffect, useState } from "react"
import Button from "shared/components/Button"
import RealmBanner from "shared/components/RealmModal/RealmBanner"
import RealmIcon from "shared/components/RealmIcon"
import {
  claimXp,
  selectDisplayedRealmId,
  selectRealmById,
  selectTransactionStatusById,
  stopTrackingTransactionStatus,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import ClaimCongratulations from "ui/Claim/modals/ClaimCongratulations"
import Tooltip from "shared/components/Tooltip"
import { useTransactionSuccessCallback } from "shared/hooks"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { bigIntToUserAmount, separateThousandsByComma } from "shared/utils"
import { LINKS } from "shared/constants"

const CLAIM_XP_TX_ID = "claim-xp"

export default function BannerRewards({
  amount,
  setJustClaimed,
}: {
  amount: bigint
  setJustClaimed: (hasClaimed: boolean) => void
}) {
  const dispatch = useDappDispatch()
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realm = useDappSelector((state) => selectRealmById(state, realmId))
  const parsedAmount = separateThousandsByComma(bigIntToUserAmount(amount))
  const [savedAmount] = useState(() => parsedAmount)

  const [congratulationsModalOpen, setCongratulationsModalOpen] =
    useState(false)
  const [isClaimTransactionModalOpen, setIsClaimTransactionModalOpen] =
    useState(false)

  const claimXpTransactionStatus = useDappSelector((state) =>
    selectTransactionStatusById(state, CLAIM_XP_TX_ID)
  )

  const claimTransaction = () => {
    if (realmId) {
      dispatch(claimXp({ id: CLAIM_XP_TX_ID, realmId }))
      setJustClaimed(true) // to keep the banner + congratulation modal open
    }
  }

  const claimTransactionData = {
    id: CLAIM_XP_TX_ID,
    title: "Sign transaction to claim XP",
    buttonLabel: "Claim XP",
    status: claimXpTransactionStatus,
    onClick: claimTransaction,
  }

  const claimTransactionSuccessCallback = useCallback(() => {
    setIsClaimTransactionModalOpen(false)
    setCongratulationsModalOpen(true)
    dispatch(stopTrackingTransactionStatus(CLAIM_XP_TX_ID))
  }, [dispatch])

  useTransactionSuccessCallback(
    claimXpTransactionStatus,
    claimTransactionSuccessCallback
  )

  useEffect(
    () => () => {
      dispatch(stopTrackingTransactionStatus(CLAIM_XP_TX_ID))
    },
    [dispatch]
  )

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
            onClick={() => setIsClaimTransactionModalOpen(true)}
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
      <TransactionsModal
        isOpen={isClaimTransactionModalOpen}
        close={() => setIsClaimTransactionModalOpen(false)}
        transactions={[claimTransactionData]}
      />
      {congratulationsModalOpen && (
        <ClaimCongratulations
          realmId={realmId}
          amount={savedAmount}
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
