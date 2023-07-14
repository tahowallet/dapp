import React from "react"
import Button from "../shared/Button"

export default function ClaimCheck() {
  return (
    <>
      <div className="check_container">
        <div className="header_container">
          <div className="season">Season 1</div>
          <h1 className="header">Check if you are eligible</h1>
          <div className="subHeader">
            Check if you are eligible to claim TAHO tokens
          </div>
        </div>
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
          color: var(--grey100);
        }
        .header_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .season {
          text-transform: uppercase;
          font-weight: 600;
          color: var(--semanticSuccess);
        }
        .header {
          font-family: "QuincyCF-Regular";
          font-size: 52px;
        }
        .subheader {
          color: var(--grey70);
          font-weight: 500;
        }
        .input_container {
          width: 696px;
          display: flex;
          padding: 20px 24px;
          border-radius: 80px;
          border: 1px solid var(--grey30);
          background: var(--green100);
        }
        .input {
          flex-grow: 1;
          border: 0;
          font-family: "Segment-Regular";
          font-size: 18px;
          font-weight: 600;
          line-height: 24px;
          background: transparent;
          color: var(--green5);
        }
        .input&::placeholder {
          color: var(--green5);
        }
        .input&:focus {
          outline: none;
        }
      `}</style>
    </>
  )
}
