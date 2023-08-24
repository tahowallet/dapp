import React from "react"

type ClaimHeaderProps = {
  header: string | React.ReactNode
  season?: string | React.ReactNode
  subheader?: string | React.ReactNode
}

export default function ClaimHeader({
  season,
  header,
  subheader,
}: ClaimHeaderProps) {
  return (
    <>
      <div className="header_container">
        {season && <div className="season">{season}</div>}
        {header && <h1 className="header">{header}</h1>}
        {subheader && <div className="subheader">{subheader}</div>}
      </div>
      <style jsx>{`
        .header_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .season {
          text-transform: uppercase;
          font-weight: 600;
          color: var(--semantic-success);
        }
        .header {
          font: var(--text-h1);
          font-size: 52px;
          letter-spacing: 1px;
          color: var(--secondary-s1-100);
        }
        .subheader {
          color: var(--secondary-s1-70);
        }
      `}</style>
    </>
  )
}
