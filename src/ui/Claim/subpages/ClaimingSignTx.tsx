import React, { useState } from "react"
import Icon from "shared/components/Media/Icon"
import Button from "shared/components/Interface/Button"
import lockIcon from "shared/assets/icons/s/lock.svg"
import ClaimingTransactions from "./ClaimingTransactions"

export default function ClaimingSignTx() {
  const [isTxModalOpen, setIsTxModalOpen] = useState(false)

  return (
    <>
      <div className="sign_container column">
        <div className="sign_description column">
          <h1>Sign 2 transaction to Claim</h1>
          <p>
            Time to claim your TAHO and to delegate your voting power.
            <br />
            You will need to sign two transactions: just choosing a
            representative in the DAO.
          </p>
        </div>
        <div className="step_container column">
          <div className="step row">
            <div className="step_number">1</div>
            <div className="step_text column">
              <h3>Delegate voting power</h3>
              <p>
                The first transaction will delegate your voting power to the
                chosen delegate, meaning you are only choosing a representative
                in the DAO, not sending your tokens to them.
              </p>
            </div>
          </div>
          <div className="step row">
            <div className="step_number">2</div>
            <div className="step_text column">
              <h3>Claim your TAHO</h3>
              <p>
                The second transaction is the one that everybody is here for!
                This transaction will send your TAHO to you, from where you can
                stake them into a realm.
              </p>
            </div>
          </div>

          <div className="warning_container column">
            <h4 className="warning_header row">
              <Icon src={lockIcon} color="var(--semantic-attention)" />
              Locked
            </h4>
            <p>
              Keep in mind that TAHO tokens are locked for the
              <span className="bold"> first 90 days</span>, meaning they
              can&apos;t be transferred, swapped, only staked.
            </p>
          </div>
        </div>

        <div className="button_container row">
          <Button
            onClick={() => setIsTxModalOpen(true)}
            type="primary"
            size="large"
          >
            Claim TAHO
          </Button>
        </div>
      </div>
      <ClaimingTransactions
        isOpen={isTxModalOpen}
        close={() => setIsTxModalOpen(false)}
      />
      <style jsx>{`
        .sign_container {
          gap: 48px;
        }
        .sign_container h3 {
          color: var(--secondary-s1-100);
        }
        .sign_description {
          gap: 8px;
        }
        .step_container {
          gap: 16px;
        }
        .step {
          gap: 20px;
        }
        .step_text {
          gap: 12px;
        }
        .step_number {
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          flex-shrink: 0;
          border-radius: 100%;
          color: var(--secondary-s1-80);
          font-weight: 600;
          background: rgba(13, 33, 32, 0.5);
          border: 1px solid var(--secondary-s1-80);
        }
        .button_container {
          gap: 24px;
        }
        .warning_container {
          margin-top: 4px;
          border-radius: 8px;
          gap: 8px;
          background: rgba(13, 35, 33, 0.4);
          padding: 16px;
          width: 500px;
          margin-left: 60px;
        }
        .warning_header {
          color: var(--semantic-attention);
          align-items: center;
          gap: 4px;
          font-style: normal;
          font-weight: 500;
        }
        .bold {
          color: var(--secondary-s1-100);
        }
      `}</style>
    </>
  )
}
