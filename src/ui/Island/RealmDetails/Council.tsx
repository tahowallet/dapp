import React from "react"
import placeholderCouncil from "shared/assets/placeholder-council.png"

export default function Council() {
  return (
    <>
      <div className="council_container center">
        <img
          src={placeholderCouncil}
          height={373}
          width={637}
          alt="Placeholder: Council"
        />
        <h1 className="placeholder_title">Coming in Season 1</h1>
      </div>
      <style jsx>{`
        .council_container {
          width: 675px;
          height: 382px;
          padding: 16px 24px 24px 24px;
          gap: 14px;
          margin: 24px 0;
          border-radius: 24px;
          background: var(--primary-p1-40);
        }
        .placeholder_title {
          position: absolute;
          margin: 0 auto;
          color: var(--secondary-s-1100, #e4eeee);
          font: var(--text-h1);
          text-align: center;
          letter-spacing: 0.84px;
        }
      `}</style>
    </>
  )
}
