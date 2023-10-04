import React from "react"
import placeholderCouncil from "shared/assets/placeholder_council.png"

export default function Council() {
  return (
    <>
      <div className="council_container">
        <img
          src={placeholderCouncil}
          height={373}
          width={637}
          alt="Placeholder: Coming in Season 1"
        />
        <h1 className="placeholder_title">Coming in Season 1</h1>
      </div>
      <style jsx>{`
        .council_container {
          display: flex;
          width: 675px;
          height: 382px;
          flex-shrink: 0;
          padding: 16px 24px 24px 24px;
          flex-direction: column;
          gap: 14px;
          margin: 24px 0;
          border-radius: 24px;
          background: var(--primary-p1-40);
          align-items: center;
          justify-content: center;
        }
        .placeholder_title {
          position: absolute;
          margin: 0 auto;
          color: var(--secondary-s-1100, #e4eeee);
          font-family: "QuincyCF";
          font-size: 42px;
          font-style: normal;
          font-weight: 500;
          line-height: 110%; /* 46.2px */
          letter-spacing: 0.84px;
        }
      `}</style>
    </>
  )
}
