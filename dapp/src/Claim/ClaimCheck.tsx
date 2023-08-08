import React from "react"
import { useHistory } from "react-router-dom"
import Button from "../shared/components/Button"
import ClaimHeader from "./shared/ClaimHeader"
import Modal from "../shared/components/Modal"

export default function ClaimCheck() {
  const location = useHistory()

  return (
    <Modal>
      <div className="check_container">
        <ClaimHeader
          season="Season 1"
          header="Check if you are eligible"
          subheader="Check if you are eligible to claim TAHO tokens"
        />
        <div className="input_container">
          <input className="input" placeholder="Address / Ens / Uns..." />
          <Button
            size="large"
            onClick={() => location.replace("/claim/success")}
          >
            Check eligibility
          </Button>
        </div>
      </div>
      <style jsx>{`
        .check_container {
          padding: 40px 106px 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          color: var(--secondary-s1-100);
        }
        .input_container {
          width: 696px;
          display: flex;
          padding: 20px 24px 20px 43px;
          border-radius: 80px;
          border: 1px solid var(--secondary-s1-30);
          background: var(--primary-p1-100);
        }
        .input {
          flex-grow: 1;
          border: 0;
          font-family: "Segment";
          font-size: 18px;
          font-weight: 500;
          line-height: 24px;
          background: transparent;
          color: var(--green-5);
        }
        .input::placeholder {
          color: var(--green-5);
        }
      `}</style>
    </Modal>
  )
}
