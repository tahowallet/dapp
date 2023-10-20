import React, { ReactNode } from "react"

export default function LoadingText({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="loading_text">{children}</div>
      <style jsx>{`
        .loading_text {
          text-align: center;
          color: var(--secondary-s1-70);
          margin-top: 20px;
          font-family: var(--sans);
        }
      `}</style>
    </>
  )
}
