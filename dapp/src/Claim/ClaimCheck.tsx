import React from "react"
import Button from "../shared/Button"
import ClaimHeader from "./ClaimHeader"

export default function ClaimCheck() {
  return (
    <>
      <div className="check_container">
        <ClaimHeader
          season="Season 1"
          header="Check if you are eligible"
          subheader="Check if you are eligible to claim TAHO tokens"
        />
        <div className="input_container">
          <input className="input" placeholder="Address / Ens / Uns..." />
          <Button size="large">Check eligibility</Button>
        </div>
      </div>
      <style jsx>{`
        .check_container {
          padding: 40px 106px 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          font-family: "Segment-Regular";
          font-size: 18px;
          line-height: 24px;
          font-style: normal;
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
          font-family: "Segment-Regular";
          font-size: 18px;
          font-weight: 600;
          line-height: 24px;
          background: transparent;
          color: var(--green-5);
        }
        .input::placeholder {
          color: var(--green-5);
        }
        .input:focus {
          outline: none;
        }
      `}</style>
    </>
  )
}
