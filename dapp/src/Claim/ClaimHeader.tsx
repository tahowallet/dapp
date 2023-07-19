import React from "react"

type ClaimHeaderProps = {
  season: string | React.ReactNode
  header: string | React.ReactNode
  subheader: string | React.ReactNode
}

export default function ClaimHeader({
  season,
  header,
  subheader,
}: ClaimHeaderProps) {
  return (
    <>
      <div className="header_container">
        <div className="season">{season}</div>
        <h1 className="header">{header}</h1>
        <div className="subheader">{subheader}</div>
      </div>
      <style jsx>{`
        .header_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          font-family: "Segment-Regular";
          font-style: normal;
          line-height: 24px;
          font-size: 18px;
          font-weight: 500;
        }
        .season {
          text-transform: uppercase;
          font-weight: 600;
          color: var(--semantic-success);
        }
        .header {
          font-family: "QuincyCF-Regular";
          font-size: 52px;
          line-height: 42px;
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
