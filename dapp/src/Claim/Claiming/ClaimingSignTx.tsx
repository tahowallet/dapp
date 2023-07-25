import React from "react"
import { useHistory } from "react-router-dom"
import Icon from "../../shared/Icon"
import Button from "../../shared/Button"
import lockIcon from "../../shared/assets/icons/s/lock.svg"

export default function ClaimingSignTx() {
  const location = useHistory()

  return (
    <>
      <h1>Sign 2 transaction to Claim</h1>
      <p>
        Time to claim your TAHO and to delegate your voting power.
        <br />
        You will need to sign two transactions: just choosing a representative
        in the DAO.
      </p>

      <div className="step_container">
        <div className="step">
          <div className="step_number">1</div>
          <div className="step_text">
            <h3>Delegate voting power</h3>
            <p>
              The first transaction will delegate your voting power to the
              chosen delegate, meaning you are only choosing a representative in
              the DAO, not sending your tokens to them.
            </p>
          </div>
        </div>
        <div className="step">
          <div className="step_number">2</div>
          <div className="step_text">
            <h3>Claim your TAHO</h3>
            <p>
              The second transaction is the one that everybody is here for! This
              transaction will send your TAHO to you, from where you can stake
              them into a region.
            </p>
          </div>
        </div>
      </div>

      <div className="warning_container">
        <h5>
          <Icon src={lockIcon} />
          Locked
        </h5>
        <p>
          Keep in mind that TAHO tokens are locked for the
          <span className="bold"> first 90 days</span>, meaning they can&apos;t
          be transferred, swapped, only staked.
        </p>
      </div>
      <div className="button_container">
        <Button
          onClick={() => location.replace("/claim/finish")}
          type="primary"
          size="large"
        >
          Delegate
        </Button>
        <Button
          onClick={() => location.replace("/claim/finish")}
          type="primary"
          size="large"
        >
          Claim TAHO
        </Button>
      </div>
    </>
  )
}
